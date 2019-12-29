<?php
public static function saveOrder($data)
  	{
     $db = static::getDB();
     try {

        $db->beginTransaction();
        
        $sql = "INSERT INTO orders (status, insert_dt) 
        		VALUES (1,	NOW())";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        
        $order_id = $db->lastInsertId();
        
        $sql1 = "INSERT INTO order_products (order_id, product_id, quantity) 
        		VALUES (:order_id, :id, :quantity)";
        
        $stmt1 = $db->prepare($sql1);
        
        foreach($data as $product) {
        	$stmt1->bindValue(':order_id', $order_id, PDO::PARAM_INT);
        	$stmt1->bindValue(':id', $product->id, PDO::PARAM_INT);
        	$stmt1->bindValue(':quantity', $product->quantity, PDO::PARAM_INT);
          	$stmt1->execute();
        }

        $db->commit();
        return true;
      } catch(Exception $e) {
        $db->rollback();
        throw $e;
        return false;
        }
        
    }
  

    public static function saveProduct($data) {
      $db = static::getDB();
      try {

        $db->beginTransaction();

        $sql = "INSERT INTO products
                 (name, picture, quantity)
                VALUES (:name, :picture, :quantity)";

        $sql = $db->prepare($sql);

        $sql->bindValue(":name", $data->name , PDO::PARAM_STR);
        $sql->bindValue(":picture", $data->picture , PDO::PARAM_STR);
        $sql->bindValue(":quantity", $data->quantity , PDO::PARAM_INT);
        $sql->execute();

        $db->commit();

        return true;
      } catch(Exception $e) {
        throw $e;
        return false;
      }
    } 

    public function saveProductAction()
    {
      	header("Access-Control-Allow-Origin: *");
      	$data = json_decode(file_get_contents('php://input'));
      	if($data) {
        	$response = ApplicationModel::saveProduct($data) ? 'success' : 'save_error';
        } else {
          $response = 'data_error';
        }
      	header('Content-Type: application/json');
       	
      	echo json_encode($response);
    }