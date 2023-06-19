<?php

require APPPATH.'libraries/REST_Controller.php';

class User extends REST_Controller{

  public function __construct(){
    parent::__construct();
    
    Header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
    Header('Access-Control-Allow-Headers: *'); //for allow any headers, insecure
    Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed

  $method = $_SERVER['REQUEST_METHOD'];
   if ($method == "OPTIONS") {
   die();

  }
  
    $this->load->database();
    $this->load->model(array("api/user_model"));
    $this->load->library(array("form_validation"));
    $this->load->helper("security");
  }

  public function index_post(){
  
    $u_name = $this->security->xss_clean($this->input->post("u_name"));
    $u_lastname = $this->security->xss_clean($this->input->post("u_lastname"));
    $u_address = $this->security->xss_clean($this->input->post("u_address"));
    $u_username = $this->security->xss_clean($this->input->post("u_username"));
    $u_postnumber = $this->security->xss_clean($this->input->post("u_postnumber"));
    $u_city = $this->security->xss_clean($this->input->post("u_city"));
    $u_password = $this->security->xss_clean($this->input->post("u_password"));

   
    $this->form_validation->set_rules("u_name", "U_name", "required");
    $this->form_validation->set_rules("u_lastname", "U_lastname", "required");
    $this->form_validation->set_rules("u_address", "U_address", "required");
    $this->form_validation->set_rules("u_username", "U_username", "required");
    $this->form_validation->set_rules("u_postnumber", "U_postnumber", "required");
    $this->form_validation->set_rules("u_city", "U_city", "required");
    $this->form_validation->set_rules("u_password", "U_password", "required");

   
    if($this->form_validation->run() === FALSE){
    
      $this->response(array(
        "status" => 0,
        "message" => "All fields are needed"
      ) , REST_Controller::HTTP_NOT_FOUND);
    }else{

      if(!empty($u_name) && !empty($u_lastname) && !empty($u_address) && !empty($u_username) && !empty($u_postnumber) && !empty($u_city) && !empty($u_password)){
        
        $user = array(
          "u_name" => $u_name,
          "u_lastname" => $u_lastname,
          "u_address" => $u_address,
          "u_username" => $u_username,
          "u_postnumber" => $u_postnumber,
          "u_city" => $u_city,
          "u_password" =>$u_password,
        );

        if($this->user_model->insert_user($user)){
          $this->response(array(
            "status" => 1,
            "message" => "User has been created"
          ), REST_Controller::HTTP_OK);
        }else{

          $this->response(array(
            "status" => 0,
            "message" => "Failed to create user"
          ), REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
        }
      }else{

        $this->response(array(
          "status" => 0,
          "message" => "All fields are needed"
        ), REST_Controller::HTTP_NOT_FOUND);
      }
    }
  }
  
  public function index_get(){
    $students = $this->user_model->get_users();

    if(count($students) > 0){

      $this->response(array(
        "status" => 1,
        "message" => "Users found",
        "data" => $students
      ), REST_Controller::HTTP_OK);
    }else{
      $this->response(array(
        "status" => 0,
        "message" => "No Users found",
        "data" => $students
      ), REST_Controller::HTTP_NOT_FOUND);
    }

  }

    public function index_put(){
    $data = json_decode(file_get_contents("php://input"));
    if(isset($data->u_id) && isset($data->u_name) && isset($data->u_lastname) && isset($data->u_address) && isset($data->u_username) && isset($data->u_postnumber) && isset($data->u_city) && isset($data->u_password)){

      $u_id = $data->u_id;
      $user = array(
        "u_name" => $data->u_name,
        "u_lastname" => $data->u_lastname,
        "u_address" => $data->u_address,
        "u_username" => $data->u_username,
        "u_postnumber" => $data->u_postnumber,
        "u_city" => $data->u_city,
        "u_password" => $data->u_password,
      );

      if($this->user_model->update_user_information($u_id, $user)){
          $this->response(array(
            "status" => 1,
            "message" => "User data updated successfully"
          ), REST_Controller::HTTP_OK);
      }else{

        $this->response(array(
          "status" => 0,
          "messsage" => "Failed to update user data"
        ), REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
      }
    }else{

      $this->response(array(
        "status" => 0,
        "message" => "All fields are needed"
      ), REST_Controller::HTTP_NOT_FOUND);
    }
  }

  public function index_delete($u_id){
  
    if($this->user_model->delete_user($u_id)){
           
      $this->response(array(
        "status" => 1,
        "message" => "User has been deleted"
      ), REST_Controller::HTTP_OK);
    }else{
           
      $this->response(array(
        "status" => 0,
        "message" => "Failed to delete user"
      ), REST_Controller::HTTP_NOT_FOUND);
    }
  }





}



 ?>
