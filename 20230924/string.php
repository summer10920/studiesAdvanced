<h1>變數 variable 與字串 string</h1>
<?php
// $overmydeadbody = '<label>來講個冷笑話：</label>';
// $over_my_dead_body = '<label>來講個冷笑話：</label>';
// $overMyDeadBody = '<label>來講個冷笑話：</label>';
// $aa = '<label>來講個冷笑話：</label>';
// $bb = '<label>來講個冷笑話：</label>';
// $cc = '<label>來講個冷笑話：</label>';
// $cc = '<label>來講個冷笑話：</label>';
// $cafe = '<label>來講個冷笑話：</label>';
// $_Title = '<label>來講個冷笑話：</label>';

$what = '來講個冷笑話：';
// $title = $what.$what;   // var.var
$title = '<label>' . $what . '</label><hr>';   // string.var.string

print($title);

$who = '小明';
$where = '超商';
$why = '為什麼';
$when = '繳費';
$how = '坐著輪椅?';

print '<p>' . $why . $who . '去' . $where . $when . '後，' . $who . '出來卻要' . $how . '</p>';
?>
<p><?= $why ?><?= $who ?>去<?= $where ?><?= $when ?>後，<?= $who ?>出來卻要<?= $how ?></p>
<p><?= $why ?><?= $who ?>去<?= $where . $when ?>後，<?= $who ?>出來卻要<?= $how ?></p>