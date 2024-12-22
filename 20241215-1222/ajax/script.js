/*
* 好習慣都會等DOM都選染完成，不論代碼放在哪，
* 另好處是變數都不是全域的，所以全域下讀取不到
*/

// $(function () {
  // -------------------------------初始宣告區
  let start = 0;
  const loadBtn = $('tfoot button');
  const addBtn = $('.add-zone div');

  const selectAnimal = () => {
    // $.ajax({
    //   url: 'http://192.168.211.1/api.php?do=select',
    //   type: 'POST',
    //   data: { start: 0 },
    //   dataType: 'html',
    //   success: function (data) {
    //     $('tbody').html(data);
    //   }
    // });

    $.post('http://192.168.211.1/api.php?do=select', { start }, function (data) {
      if (data !== 'fail') {
        $('tbody').append(data);

        // ---------------------------------------新html的事件區
        //此時新生成的 mdyBtn, 沒有要求 click
        $('.mdy').click(changeToInputEl);

        start += 10;
      } else loadBtn.attr('disabled', true).text('沒有更多了');
    }, 'html');
  }

  // 此fn 負責將該行指定的input內容，壓縮成 serialize(form Data)，透過 ajax 提交給後端
  const changeAnimal = (e) => {
    const saveBtn = $(e.target);
    const uncles = saveBtn.parent().siblings();

    // 畫面上的新值
    const id = uncles.eq(0).text();
    const name = uncles.eq(1).find('input').val();
    const weight = uncles.eq(2).find('input').val();
    const info = uncles.eq(3).find('input').val();

    const data = { id, name, weight, info };

    $.post(
      'http://192.168.211.1/api.php?do=update',
      data,
      function (res) { //後端會返回更新時間給前端，想辦法把更新資料補回畫面上
        // 將目前html 畫面上的 input ，修正回普通的 table td (更新後的文字)

        const theTime = res;

        uncles.parent().html(`
  <td>${id}</td>
  <td class="name">${name}</td>
  <td>${weight}</td>
  <td>${info}</td>
  <td>${theTime}</td>
  <td>
    <button class="mdy">修改</button>
    <button onclick="deleteAnimal(this)">刪除</button>
  </td>
  `).find('.mdy').click(changeToInputEl);

      })
  }

  const deleteAnimal = (node) => {
    // console.log('js html node', node);
    // console.log('jq Node object', );
    // const id = $(node).parent().siblings().eq(0).text();

    $.post('http://192.168.211.1/api.php?do=delete', { id: $(node).parent().siblings().eq(0).text() }, function (res) {
      if (res === 'deleted') { // 確認後端刪除成功，前端才跟著也同步的做畫面刪除。
        $(node).parents('tr').remove();
      }
    });

    // const delBtn = $(e.target);
    // console.log(delBtn)

  }

  const insertAnimal = (node) => {
    const data = $(node).parent().siblings().find('input').serialize();
    // console.log(data);

    $.post('http://192.168.211.1/api.php?do=insert', data, function (res) {
      if (res === 'inserted') {
        closeAddForm();  // 關閉新增畫面

        // 因為資料多一筆，如果不想去判斷畫面何時要插入最後一筆到tbody 內
        // 這裡乾脆全部reset 重跑 selectAnimal
        $('tbody').empty();
        start = 0;
        selectAnimal();
      }
    });
  }

  // 此fn 負責將該行指定的td內容變成input
  const changeToInputEl = (e) => {
    const currentMdyBtn = $(e.target);
    const uncles = currentMdyBtn.parent().siblings();

    currentMdyBtn.parents('tr')
      .html(`
  <td>${uncles.eq(0).text()}</td>
  <td class="name">
    <input name="name" value="${uncles.eq(1).text()}">
  </td>
  <td>
    <input name="weight" value="${uncles.eq(2).text()}">
  </td>
  <td>
    <input name="info" value="${uncles.eq(3).text()}">
  </td>
  <td>${uncles.eq(4).text()}</td>
  <td>
    <button class="save">儲存</button>
  </td>
  `)
      .find('.save')
      .click(changeAnimal);

  }

  const activeAddForm = () => {
    $('.insert-zone')
      .html(`
    <form action="">
      <h1>新增動物資料</h1>
      <hr>
      <p>動物：<input type="text" name="name"></p>
      <p>重量：<input type="text" name="weight"></p>
      <p>簡介：<input type="text" name="info"></p>
      <hr>
      <p>
        <!-- 注意 button 沒有 type 會形同 submit -->
        <button type="button" onclick="insertAnimal(this)">新增</button>
        <button type="button" onclick="closeAddForm()">取消</button>
      </p>
    </form>
  `).fadeIn();
  }

  const closeAddForm = () => {
    $('.insert-zone').fadeOut();
  }


  // -------------------------------初始事件區
  loadBtn.click(selectAnimal);
  addBtn.click(activeAddForm);


  // -------------------------------初始第一次執行
  selectAnimal();
// });