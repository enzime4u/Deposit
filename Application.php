<?php

namespace App\Controllers;

use \Core\View;
use \App\Models\ApplicationModel;

/**
 * Application controller
 *
 * PHP version 7.0
 */
class Application extends \Core\Controller
{

    /**
     * Save the order
     *
     * @return void
     */
    public function saveorderAction()
    {
      	header("Access-Control-Allow-Origin: *");
      	$data = json_decode(file_get_contents('php://input'));
      	if($data) {
        	$response = ApplicationModel::saveOrder($data) ? 'success' : 'save_error';
        } else {
          $response = 'data_error';
        }
      	header('Content-Type: application/json');
       	
      	echo json_encode($response);
    }
  
  	/**
     * View the orders
     *
     * @return array
     */
  	public function getOrdersAction()
  	{
      $order = ApplicationModel::getOrders();
      header('Content-Type: application/json');
      echo json_encode($order);
    }
  
  	/**
     * View all products for specific order
     *
     * @return array of associative arrays
     */
  	public function orderProductsAction()
  	{
      	//$order = ApplicationModel::getOrderProducts();
      	//header('Content-Type: application/json');
      	//echo json_encode($order);
     
      	header("Access-Control-Allow-Origin: *");
		$data = json_decode(file_get_contents('php://input'));
      	if($data) {
        	$response = ApplicationModel::getOrderProducts($data) ? "success":"data_error";
        } else {
          $response = 'data_error';
        }
      	header('Content-Type: application/json');

      	echo json_encode($response);
    }
  	
  	/**
     * View the products
     *
     * @return array
     */
  	public function getProductsAction()
  	{
    	$products = ApplicationModel::getProducts();
      	header('Content-Type: application/json');
      	echo json_encode($products);
  	}

}
