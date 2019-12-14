onmessage = function(e) {
  let success_num = 0;
  let fail_num = 0;
  let imagestr = e.data[0];

  let imagelist = imagestr.split(",");
  let total_num = imagelist.length;
  let domain = e.data[1];
  console.log(total_num);

  postMessage("开始检测");
  let num = 0;
  for(let image of imagelist){
    let url = `${domain}${image}`;
    num++;

    postMessage("正在检测第"+num+"条");
    checkimaga(url);
  }

  function checkimaga(url){
    /*let image = new Image();
    image.src = url;

    image.onload = function(){
      success_num++;
      isEnd();
    };

    image.onerror = function(){
      fail_num++;
      isEnd();
    }*/

    var xhr = new XMLHttpRequest();
    //xhr.responseType = 'blob';
    xhr.onload = function(response) {
      console.log(response);
      let {status} = response.target || response.currentTarget || response.srcElement;
      if(status === 200){
        success_num++;
      }
      else{
        fail_num++;
      }
      isEnd();
    }
    xhr.onerror =  function(){
      fail_num++;
      isEnd();
    }
    xhr.open('GET', url, true);
    xhr.send();
  }

  function isEnd(){
    if(fail_num + success_num === total_num){
      postMessage(`总数：${total_num}；成功数：${success_num}；失败数：${fail_num}；失败率：${fail_num / total_num * 100}%`);
    }
  }
};
