<?php
public function saveUserAction()
    {
          header("Access-Control-Allow-Origin: *");
        echo file_get_contents('php://input');
      	$data = json_decode(file_get_contents('php://input'));
      	
      	if($data) {
        	$response = ApplicationModel::saveUser($data) ? 'success' : 'save_error';
        } else {
          $response = 'data_error';
        }
      	header('Content-Type: application/json');
       	
      	echo json_encode($response);
    }


public static function saveUser($data)
    {
          $db = static::getDB();
          try{
              $db->beginTransaction();
              $sql = 'INSERT INTO user (email, name, password)
                VALUES (:email, :name, :password)';

            $stmt = $db->prepare($sql);
            $stmt->bindValue(':email', $data->email, PDO::PARAM_STR);
        $stmt->bindValue(':name', $data->name, PDO::PARAM_STR);
        $stmt->bindValue(':password', md5($data->password), PDO::PARAM_STR)
        $stmt->execute();
          $db->commit();
          return true;
          } catch(Exception $e) {
              throw $e;
              return false;
          }
    }
