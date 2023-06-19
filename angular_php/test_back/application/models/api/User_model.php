<?php

class User_model extends CI_Model{
  
  public function __construct(){
    parent::__construct();
    $this->load->database();
  }

  public function get_users(){

    $this->db->select("*");
    $this->db->from("users");
    $query = $this->db->get();

    return $query->result();
  }

   public function insert_user($data = array()){
      return $this->db->insert("users", $data);
   }
   public function delete_user($u_id){
     $this->db->where("u_id", $u_id);
     return $this->db->delete("users");
     
   }

   public function update_user_information($u_id, $user){
      $this->db->where("u_id", $u_id);
      return $this->db->update("users", $user);
   }
}

 ?>
