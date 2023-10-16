<?php
// include_once('ic_movieA.php');
// require('ic_movieA.php');
// require_once('ic_movieA.php');

// print_r($_GET);
// if(!empty($_GET['loki'])) echo $_GET['loki'];
// if(!empty($_GET['face'])) echo $_GET['face'];

if (!empty($_GET['movie'])) {
  // if ($_GET['movie'] === 'A') {
  //   include_once('ic_movieA.php');
  //   include_once('ic_layout.php');
  // }
  // elseif ($_GET['movie'] === 'B') {
  //   include_once('ic_movieB.php');
  //   include_once('ic_layout.php');
  // }
  // elseif ($_GET['movie'] === 'C') {
  //   include_once('ic_movieB.php');
  //   include_once('ic_layout.php');
  // }
  switch ($_GET['movie']) {
    case 'A':
      include_once('ic_movieA.php');
      break;
    case 'B':
      include_once('ic_movieB.php');
      break;
  }
  include_once('ic_layout.php');
  // echo '<a href="ic_content.php">Go Back</a>';
echo 'run';
} else {
?>
  <ul>
    <li><a href="ic_content.php?movie=A">電影A</a></li>
    <li><a href="ic_content.php?movie=B">電影B</a></li>
  </ul>
<?php
}
?>