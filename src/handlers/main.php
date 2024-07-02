<?php
header("Access-Control-Allow-Origin: *");
// if(preg_match('/(^|^[^:]+:\/\/|[^\.]+\.)hh\.ru$/', $_SERVER['HTTP_ORIGIN'])) header("Access-Control-Allow-Origin: ".$_SERVER['HTTP_ORIGIN']);
header("Content-type: text/plain; charset=utf-8");
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
define('INIT', TRUE);

require "../../config.php";
require "../../vendor/autoload.php";
use Illuminate\Database\Capsule\Manager as Capsule;

// ======== mini docs ========
//
// --- POST /handlers/main.php
// --- REQUEST PARAMS
// task = store
// special - string
// level - integer <- уровень сложности, число
// cards - integer <- количество карточек, число
// moves - integer <- количество ходов, число
// errors - integer <- количество ошибок, число
// --- RESPONSE PARAMS
// percent - integer <- процент
//
// Available statuses
//  1 - ok
// -1 - default error
// -2 - wrong task
// -3 - db error
// -4 - wrong fields

class RzhdMainHandler {
    protected $config;
    protected $db;
    protected $request;
    protected $requestConfirmed = false;

    public $result = [
        'status' => 1,
        'message' => 'Success.'
    ];

    function __construct($config) {
        $this->config = $config;
        $this->request = ($_SERVER['REQUEST_METHOD'] === 'POST') ? $_POST : $_GET;
        $this->request["method"] = $_SERVER['REQUEST_METHOD'];
        if(isset($this->request["special"])) if($this->request["special"] == $this->config['ajaxSpecial']) {
            $this->requestConfirmed = true;
            $capsule = new Capsule;
            $capsule->addConnection($this->config['db']);
            $capsule->setAsGlobal();
            $capsule->bootEloquent();
            $this->db = $capsule;
            $this->request = (object)$this->request;
        }
    }

    protected function store() {
        if($this->result["status"]<0) return $this;

        if(
            (((int)$this->request->level) < 0)
            ||
            (((int)$this->request->cards) < 1)
            ||
            (((int)$this->request->moves) < 1)
            ||
            (((int)$this->request->errors) < 0)
        ) {
            $this->result["status"] = -4;
            $this->result["message"] = "Wrong fields data.";
            return $this;
        }

        try {
            if (((int)$this->request->errors) > 0) { // для второго варианта результата
                $selected = $this->db->table($this->config['db']['table'])
                    ->where([
                        ['level', $this->request->level],
                        ['cards', $this->request->cards],
                        ['moves', '>', $this->request->moves],
                    ])
                    ->count();
            } else { // для первого варианта результата
                $selected = $this->db->table($this->config['db']['table'])
                    ->where([
                        ['level', $this->request->level],
                        ['cards', $this->request->cards],
                        ['errors', 0],
                    ])
                    ->count();
            }

            $total = $this->db->table($this->config['db']['table'])
                ->where([
                    ['level', $this->request->level],
                    ['cards', $this->request->cards],
                ])
                ->count();

            if ($total < 1) $total = 1;

            $percent = ($selected / $total) * 100;
            $this->result["percent"] = number_format($percent, 0, '.', '');

            $response = $this->db->table($this->config['db']['table'])->insert([
                'level' => $this->request->level,
                'cards' => $this->request->cards,
                'moves' => $this->request->moves,
                'errors' => $this->request->errors,
            ]);

            if(!$response) {
                $this->result["status"] = -3;
                $this->result["message"] = "DB error.";
            }

            return $this;
        }
        catch (Illuminate\Database\QueryException $e) {
            $this->result["status"] = -3;
            $this->result["message"] = "DB error.";

            return $this;
        }
    }

    protected function tasksPost(){
        switch ($this->request->task) {
            case 'store':
                $this->store();
                break;

            default:
                $this->result["status"] = -2;
                $this->result["message"] = "Error. Wrong task.";
                break;
        }
    }

    public function process(){
        if($this->requestConfirmed) {
            switch (strtoupper($this->request->method)) {
                case 'POST':
                    $this->tasksPost();
                    break;

                default:
                    $this->result["status"] = -1;
                    $this->result["message"] = "1Error.";
                    break;
            }
        } else {
            $this->result["status"] = -1;
            $this->result["message"] = "Error.";
        }
        return $this->result;
    }
}

$handler = new RzhdMainHandler($config);

$handler_result = $handler->process();

echo json_encode($handler_result, JSON_UNESCAPED_UNICODE);
