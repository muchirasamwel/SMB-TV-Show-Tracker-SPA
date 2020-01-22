<?php
include('./dbcon.php');
class Db
{
    protected $con;
    public function __construct($con)
    {
        $this->con = $con;
    }
    private function columns($table)
    {
        $query = "DESCRIBE $table";
        $result = $this->con->query($query);
        $rows = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row['Field'];
            }
            return ($rows);
        } else {
            if (!empty($this->con->error)) {
                die("error: " . $this->con->error);
            }
        }
    }
    private function as_dict($result, $table)
    {
        $data = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $data = json_encode($data);
        } else {
            $data = "no results";
        }
        return $data;
    }
    public function getSession(){
        return $_SESSION;
    }
    public function insert($table)
    {
        $db_columns = $this->columns($table);
        $columns = [];
        $values = [];
        foreach ($_POST as $key => $value) {
            if ((in_array($key, $db_columns) && $key != 'id') && $value != "") {
                $columns[] = $key;
                $values[] = "'" . $value . "'";
            }
        }
        $columns = join(",", $columns);
        $values = join(",", $values);
        $query = "insert into " . $table . " (" . $columns . ") values (" . $values.")";
        //echo "query".$query;
        if ($this->con->query($query)) {
            return "insert success";
        } else {
            if (!empty($this->con->error)) {
                die("error: " . $this->con->error);
            }
            return "Unknown Error";

        }
    }
    public function select($table)
    {
        $columns = $this->columns($table, $this->con);
        $query = "select * from " . $table;
        if (count($_POST) > 2) {
            $query = $query . " where ";
            foreach ($_POST as $key => $value) {
                if ((array_search(strtolower($key), $columns) || $key == 'id') && ($key != 'join_type')&& ($key != 'action')) {
                    if (isset($_POST['join_type']))
                        $query = $query . "$key='$value' or ";
                    else
                        $query = $query . "$key='$value' and ";
                }
            }
            if (isset($_POST['join_type']))
                $query = substr_replace($query, "", -4);
            else
                $query = substr_replace($query, "", -5);
        }
        //echo $query;
        $result = $this->con->query($query);
        if (isset($_POST['select_type'])) {
            $data = as_table($result, $columns);
        } else {
            $data = $this->as_dict($result, $table);
        }
        return $data;
    }
    public function update($table){
        $id=$_POST['id'];
        $columns=$this->columns($table,$this->con);
        $query="update $table set ";
        foreach ($_POST as $key => $value) {
            # code...
            if (($key!='id' && in_array($key,$columns))&& $value!="") {
                $query=$query."$key='$value',";
            }
        }
        $query=substr_replace($query, "", -1);
        $query=$query." where id='$id'";
        // echo "$query";
        if ($this->con->query($query)) {
            echo "update successful";
        }
        else{
            if(!empty($this->con->error))
            {
                die("error: ".$this->con->error);
            }

        }

    }
    public function delete($table){
        $id=$_POST['id'];
        $query="delete from ".$table. " where id='".$id."'";
        if(isset($_POST['user_id']))
        {
            $userid=$_POST['user_id'];
            $showid=$_POST['show_id'];
            $query="delete from ".$table. " where user_id='".$userid."' and show_id = '".$showid."' ";
        }
        if ($this->con->query($query)) {
            echo "delete success";
        }
        else{
            echo $this->con->error();
        }
    }
}
$_POST = json_decode(file_get_contents("php://input"),true);
$db = new Db($con);
if (isset($_FILES['image'])) {
    echo "uploading file now";
}
else if(isset($_POST['action']) && $_POST['action']=="SESSION")
{
    echo(json_encode($db->getSession()));
}
else if (isset($_POST['table']) && isset($_POST['action'])) {
    $table=$_POST['table'];
    $action=$_POST['action'];
    //echo "action = ".$action;
    if($action=='ins')
    {
        echo $db->insert($table);
    }
    else if ($action=='sel'){
        echo $db->select($table);
    }
    else if ($action=='up'){
        echo $db->update($table);
    }
    else if ($action=='del'){
        echo $db->delete($table);
    }
    else
    {
        echo "No action specified";
    }
} else {
    var_dump($_POST);

}