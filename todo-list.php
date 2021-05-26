<?php
/**
* Plugin Name: Todo-list
* Plugin URI: https://devmatt.pl
* Description: Zadanie rekrutujące. By wywołać użyj shortcode ['todo-list'].
* Version: 1.0
* Author: Mateusz Kubasa
* Author URI: https://devmatt.pl
* License: GPL2 or later
*/

function todo_list() {
  wp_enqueue_style( 'custom-css', plugins_url( '/css/style.css', __FILE__ ) );
  wp_enqueue_script( 'custom-js', plugins_url( '/js/todolist.js', __FILE__ ), $deps = array( 'jquery' ), $in_footer = true );

  $content =  '<form>';
  $content .= '<input type="text" class="todo-input">';
  $content .= '<button class="todo-button" type="submit">Enter</button>';
  $content .= '</form>';
  $content .= '</div class="todo-container">';
  $content .= '<ul class="todo-list"></ul>';
  $content .= '</div>';
  $content .= '<section class="complet"> ';
  $content .= '</section>';
  return $content;
}
add_shortcode('todo-list', 'todo_list');

