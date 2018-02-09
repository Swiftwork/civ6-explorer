const variables = require('@evry/ng-styles/dist/postcss.variables.js');

module.exports = Object.assign({}, variables, {

  /* == COLORS == */
  c_alpha: '#0079b5', /* Brand Blue */
  c_beta: '#ffca00', /* Brand Yellow */
  c_gamma: '#f3f3f3', /* Background White */
  c_delta: '#6f6f6f', /* Darker Grey */
  c_epsilon: '#ccc', /* Grey */
  c_valid: '#95c11f',
  c_warning: '#ea5b0c',
  c_invalid: '#c43b0a',

  /* == Z-INDEX == */
  z_floating: 1000,
  z_popup: 2000,

  /* == FONT STACK == */
  f_stack: '"SL Gothic", "helvetica", sans-serif',
  f_stack_signage: '"SL Gothic Signage", "helvetica", sans-serif',
  f_stack_timetable: '"SL Gothic Timetable", "helvetica", sans-serif',
  f_stack_hagin: '"SL Gothic Hagin Caps", "georgia", serif',
  f_stack_icons: 'Wax Icons',

  /* == TIMINGS == */
  t_animation: '200ms',

  /* == DIMENSIONS == */
  d_fs: '16px',
  d_lh: '24px',

  /* Heights */
  d_banner_short_height: '12vr',
  d_banner_tall_height: '18vr',
  d_banner_tall_height_md: '41vr',

  /* Grid */
  d_columns: 12,
  d_columns_gap: '1vr', /* vr = Vertical Rhythm, a unit based on d_lh */

  /* Devices */
  d_xs: '543px',
  d_sm: '544px',
  d_md: '768px',
  d_lg: '992px',
  d_xl: '1200px',
  d_xxl: '1800px',
  d_sm_max: '767px', /* One less than counter part */
  d_md_max: '991px', /* One less than counter part */
  d_lg_max: '1199px', /* One less than counter part */
  d_xl_max: '1799px', /* One less than counter part */

  /* ICONS */
  i_logo: '"\\e900"',
  i_sl: '"\\e901"',
  i_search: '"\\e902"',
  i_menu: '"\\e903"',
  i_close: '"\\e904"',
  i_collapse: '"\\e905"',
  i_expand: '"\\e906"',
  i_prev: '"\\e907"',
  i_next: '"\\e908"',
  i_expand_arrow: '"\\e909"',
  i_list_item: '"\\e90a"',
  i_select_arrows: '"\\e90b"',
  i_switch_directions: '"\\e90c"',
  i_arrow_right: '"\\e90d"',
  i_checkbox: '"\\e90e"',
  i_checkbox_checked: '"\\e90f"',
  i_radio: '"\\e910"',
  i_radio_checked: '"\\e911"',
  i_buy: '"\\e912"',
  i_ticket: '"\\e913"',
  i_time_table: '"\\e914"',
  i_calendar: '"\\e915"',
  i_stop: '"\\e916"',
  i_stop_filled: '"\\e917"',
  i_star: '"\\e918"',
  i_star_half: '"\\e919"',
  i_star_filled: '"\\e91a"',
  i_placeholder: '"\\e91b"',
  i_flag: '"\\e91c"',
  i_ship: '"\\e91d"',
  i_ship_alt: '"\\e91e"',
  i_boat: '"\\e91f"',
  i_bus: '"\\e920"',
  i_walk: '"\\e921"',
  i_accessibility: '"\\e922"',
  i_restaurant: '"\\e923"',
  i_wifi: '"\\e924"',
  i_cafe: '"\\e925"',
  i_phone: '"\\e926"',
  i_calender: '"\\e927"',
  i_chat: '"\\e928"',
  i_share: '"\\e929"',
  i_epost: '"\\e92a"',
  i_facebook: '"\\e92b"',
  i_instagram: '"\\e92c"',
  i_correct: '"\\e92d"',
  i_info: '"\\e92e"',
  i_warning: '"\\e92f"',
  i_error: '"\\e930"',
});
