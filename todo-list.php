<?php
/**
* Plugin Name: Todo-list
* Plugin URI: https://devmatt.pl
* Description: By wywołać plugin użyj shortcode [todo-list].
* Version: 1.0
* Author: Mateusz Kubasa
* License: GPL2 or later
*/

function todo_list() {
  wp_enqueue_style( 'custom-css', plugins_url( '/css/style.css', __FILE__ ) );
  wp_enqueue_style('fonts-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css', array(), '5.14.0', 'all');   
  wp_enqueue_script( 'custom-js', plugins_url( '/js/todolist.js', __FILE__ ), $in_footer = true );

  $content =  '<form class="todolist-form">';
  $content .= '<div class="todolist-title"><h2>To Do List</h2></div>';
  $content .= '<div class="todolist-add"><input type="text" class="todo-input" placeholder="Add new task">';
  $content .= '<button class="todo-button" type="submit"><i class="fas fa-sign-in-alt"></i></button></div>';
  $content .= '<ul class="todo-list"></ul>';
  $content .= '</form>';
  return $content;
}
add_shortcode('todo-list', 'todo_list');

