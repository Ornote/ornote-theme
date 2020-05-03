<?php

/**
 * Implements hook_page_attachments().
 */
use \Drupal\Core\Url;

/**
 * @file
 * Contains functions needed for the theme.
 */

global $_ornote_path_to_core;
$_ornote_path_to_core = drupal_get_path('theme', 'ornote');

/**
 * Get theme functionalities.
 */
function ornote_get_theme(&$variables) {
  ornote_load_debuggers($variables);
  ornote_add_libraries($variables);
}

/**
 * Get the path to the static files folder in the theme.
 */
function ornote_get_staticpath($addprefix = FALSE, $theme_key = 'ornote') {
  $ret = '';
  if ($addprefix) {
    $ret = '/';
  }
  $ret .= drupal_get_path('theme', $theme_key) . '/front/';
  return $ret;
}

/**
 * Add libraries to the theme.
 */
function ornote_add_libraries(&$variables) {
  $enquire = theme_get_setting('ft_enquire_js');
  if (!empty($enquire)) {
    $variables['page']['#attached']['library'][] = 'ornote/enquire';
  }

  $transit = theme_get_setting('ft_transit_js');
  if (!empty($transit)) {
    $variables['page']['#attached']['library'][] = 'ornote/transit';
  }

  $placeholder = theme_get_setting('ft_placeholder_js');
  if (!empty($placeholder)) {
    $variables['page']['#attached']['library'][] = 'ornote/placeholder';
  }

  $tabs = theme_get_setting('ft_layout_tabs');
  if (!empty($tabs)) {
    $variables['page']['#attached']['library'][] = 'ornote/tabs';
  }

  $prettify = theme_get_setting('ft_prettify_js');
  if (!empty($prettify)) {
    $variables['page']['#attached']['drupalSettings']['ornote']['prettify_hide_upload'] = theme_get_setting('ft_prettify_js_hide_upload');
    $variables['page']['#attached']['drupalSettings']['ornote']['prettify_add_remove'] = theme_get_setting('ft_prettify_js_add_remove');
    $variables['page']['#attached']['library'][] = 'ornote/prettify';
  }
}

/**
 * Load debugging helper files.
 */
function ornote_load_debuggers(&$variables) {
  $debug = FALSE;
  // Load window size bookmarklet.
  if (theme_get_setting('ft_show_window_size') === 1) {
    $debug = TRUE;
    $variables['page']['#attached']['library'][] = 'ornote/windowsize';
  }
  if (theme_get_setting('ft_show_grid') === 1) {
    $debug = TRUE;
    $variables['page']['#attached']['library'][] = 'ornote/grid';
  }
  if ($debug) {
    \Drupal::messenger()->addWarning(t('Please turn off Forty Two debuggers on production websites.'));
  }
}

function ornote_page_attachments(array &$page) {
  $page['#attached']['library'][] = 'ornote/ornote';
  $page['#attached']['drupalSettings']['ornote']['base_url'] = Url::fromRoute('<front>', [], ['absolute' => TRUE])->toString();
}
