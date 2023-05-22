

// LINKEDINE SELECOT ON FEE PAGE TO APPEND REACTION PANEL

// if (window.location.href.indexOf('linkedin.com') > -1 && window.location.href.indexOf('messaging/thread/') > -1) {
//     $selectors_for_linkedin = `.msg-form__msg-content-container--scrollable`;
// } else {
    $selectors_for_linkedin = `.comments-comment-box__form-container`;
//}
// appendHTML =  `
//         <div id="quentintou">
//         <div class="loader" style="display:none"></div>
//         <div class="lanygae_writing" style="display:flex;justify-content: space-between;margin-bottom: 15px;"><div class=""><label>Language</label><select class="change_language"><option value="french">French</option><option value="english">English</option></select></div><div class=""><label>Language</label><select class="changewriting">
//         <option value="Academic">Academic</option>
//         <option value="Analytical">Analytical</option>
//         <option value="Argumentative">Argumentative</option>
//         <option value="Conversational">Conversational</option>
//         <option value="Creative">Creative</option>
//         <option value="Critical">Critical</option>
//         <option value="Descriptive">Descriptive</option>
//         <option value="Epigrammatic">Epigrammatic</option>
//         <option value="Epistolary">Epistolary</option>
//         </select></div></div>
//          <div class="like_option" style="display:flex;display:none"><div style="display:flex"><img class="like" src="`+chrome.runtime.getURL("assets/images/like.png")+`"><img class="dislike" src="`+chrome.runtime.getURL("assets/images/dislike.png")+`"><img class="reload" src="`+chrome.runtime.getURL("assets/images/reload.png")+`"></div><div class="shorter"><select class="shorter_onchange"><option value="80">Short</option><option value="150">Long</option></select><div class="remove_close">x</div></div></div>
//             <div class="que-main-class QueRow" >
//                 <button class="que-expression-btn ExpBtn" data-feeling="agree">👍 So true!</button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="disagree">🚨 Nah</button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="funny">😂 Funny </button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="joke">🤨 Hmm…</button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="idea">😎 Dope</button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="question">❓ Question</button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="neuter">🧩 Neutral</button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="yoda">🌌 Yoda</button>
//                 <button class="que-expression-btn ExpBtn" data-feeling="emoji">🔥🙏😍</button>
//                 <div class="que-footer QueFooter" >X reply left. Beta Mode. Powered by ai2respond.com</div>
//             </div>
//         </div>`;



appendHTML =` <div id="quentintou">
       <div class="loader" style="display:none"></div>
<div class="agree_div">
<ul>
<li class="opinion">Opinion</li>
<li class="writing_style">Writing</li>
<li class="tone">Tone</li>
<li class="size">Size</li>
</ul>
<div  class="like_option" style="display:flex">
<img style="display:none" class="like" src="`+chrome.runtime.getURL("assets/images/like.png")+`">
<img style="display:none" class="dislike" src="`+chrome.runtime.getURL("assets/images/dislike.png")+`">
<img  style="display:none" class="reload" src="`+chrome.runtime.getURL("assets/images/reload.png")+`">
<img class="play" src="`+chrome.runtime.getURL("assets/images/play_submit.png")+`">

</div>
</div>
<div class="opinion_option">
<ul>
    <li>Agreed</li>
    <li>Disagreed</li>
    <li>Question</li>
    </ul>
</div>
<div class="tone_option">
<ul>
    <li>Funny</li>
    <li>Emotional</li>
    <li>Informative</li>
    <li>Narative</li>
    <li>iRONIC</li>
    </ul>
</div>
<div class="writing_option">
<ul>
    <li>Academic</li>
    <li>Analytical</li>
    <li>Argumentative</li>
    <li>Conversational</li>
    <li>Conversational</li>
    <li>Creative</li>
    <li>Critical</li>
    <li>Descriptive</li>
    <li>Epigrammatic</li>
    <li>Epistolary</li>
    </ul>
</div>
<div class="size_option">
<ul>
    <li>Long</li>
    <li>Short</li>
    </ul>
</div>
<div class="response">
<div class="inner1"></div>
<div class="inner2"></div>
<div class="inner3"></div>
<div class="inner4"></div>
</div>`;




chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { 
    if (message.subject == "responseBG" && message.from == "background") {

        if (window.location.href.indexOf('linkedin.com') > -1 ) {
              $('.like_option').show();
                     $('.loader').hide();
                     $('.like').show();
                     $('.dislike').show();
                     $('.reload').show();
                     $('.play').hide();

            LinkedInDOM.putMessageinTextArea(message.result);        
        }   else if (window.location.href.indexOf('facebook.com') > -1 ) {
            $('.like_option').show();
            $('.loader').hide();
            $('.like').show();
            $('.dislike').show();
            $('.reload').show();
            $('.play').hide();
            FacebookDOM.putMessageinTextArea(message.result);        
        }
        sendResponse({'status': 'ok'});
        return false;
    }    
})


customBtnFound = setInterval(function () { 
    if (window.location.href.indexOf('linkedin.com') > -1 ) {
        LinkedInDOM.addReactionPannelLD();        
    }   else if (window.location.href.indexOf('facebook.com') > -1 ) {
        FacebookDOM.addReactionPannelFB();         
    } else {
        console.log('please go on facebook or linkedin page');        
        clearInterval(customBtnFound);
    }
}, 500);

$(document).ready(function () { 
    $(document).on("click", ".opinion", function (e) {
    $('.agree_div ul li').removeClass('option_active')
    $(this).addClass("option_active")
    $('.opinion_option').show();
    $('.writing_option').hide();
    $('.size_option').hide();
    $('.tone_option').hide();
    $('.response').show();
})
$(document).on("click", ".writing_style", function (e) {
   // $('.agree_div ul li').removeClass('option_active')
    $(this).addClass("option_active")
    $('.opinion_option').hide();
    $('.writing_option').show();
    $('.size_option').hide();
    $('.tone_option').hide();
    $('.response').show();
})
$(document).on("click", ".tone", function (e) {
   // $('.agree_div ul li').removeClass('option_active')
    $(this).addClass("option_active")
    $('.opinion_option').hide();
    $('.writing_option').hide();
    $('.size_option').hide();
    $('.tone_option').show();
    $('.response').show();
})
$(document).on("click", ".size", function (e) {
  //  $('.agree_div ul li').removeClass('option_active')
    $(this).addClass("option_active")
    $('.opinion_option').hide();
    $('.writing_option').hide();
    $('.size_option').show();
    $('.tone_option').hide();
    $('.response').show();
})
$(document).on("click", ".opinion_option ul li", function (e) {
    $('.opinion_option ul li').removeClass('option_active')
    $(this).addClass("option_active")
    var value = $(this).text();
    var check = `.response_opinion span:contains(${value})`;
    console.log(check)
if (check.length > 0) {
    $('.response_opinion').remove();
   // setTimeout(function() {
        $('<div class="response_opinion"><span>'+value+'</span><p>x</p></div>').insertBefore( ".inner1" )
    //    }, 1000);
}
else{
    $('<div class="response_opinion"><span>'+value+'</span><p>x</p></div>').insertBefore( ".inner1" )
}
})
$(document).on("click", ".writing_option ul li", function (e) {
    $(this).addClass("option_active")
    var value = $(this).text();
    var check = `.response_writing span:contains(${value})`;
console.log(check.length);
            if ($(check).length > 0) {
 
}
else{
    $('<div class="response_writing"><span>'+value+'</span><p>x</p></div>').insertBefore( ".inner2" )
}
})
$(document).on("click", ".tone_option ul li", function (e) {
    $(this).addClass("option_active")
    var value = $(this).text();
    var check = `.response_tone span:contains(${value})`;
console.log(check.length);
            if ($(check).length > 0) {
 
}
else{
    $('<div class="response_tone"><span>'+value+'</span><p>x</p></div>').insertBefore( ".inner3" )
}
})
$(document).on("click", ".size_option ul li", function (e) {
    $('.size_option ul li').removeClass('option_active')
    $(this).addClass("option_active")
    var value = $(this).text();
    var check = `.response_size span:contains(${value})`;
    console.log("check",check.length);
if (check.length > 0) {
    $(".response_size").remove();
   // setTimeout(function() {
        $('<div class="response_size"><span>'+value+'</span><p>x</p></div>').insertBefore( ".inner4" )
    //    }, 1000);
}
else{
    $('<div class="response_size"><span>'+value+'</span><p>x</p></div>').insertBefore( ".inner4" )
}
})

$(document).on('click','.response div p',function(){
    var checktext = $(this).parent().children('span').text();
   var classfind = $(this).parent().attr('class');
   if(classfind == 'response_opinion')
   {
    $('.opinion_option ul li').removeClass('option_active')
    $('.opinion').removeClass('option_active')
   }
   if(classfind == 'response_writing')
   {
    var check = `.writing_option ul li:contains(${checktext})`;
    $(check).removeClass('option_active')
    var checkparent = $('.response_writing span')
    if(checkparent.length <= 1){
        $('.writing_style').removeClass('option_active')

    }
   }
   if(classfind == 'response_tone')
   {
    var check = `.tone_option ul li:contains(${checktext})`;
    $(check).removeClass('option_active')
    var checkparent = $('.response_tone span')
    if(checkparent.length <= 1){
        $('.tone').removeClass('option_active')

    }
   }
   if(classfind == 'response_size')
   {
    $('.size_option ul li').removeClass('option_active')
    $('.size').removeClass('option_active')
   }
       $(this).parent().remove();

});
// $(document).on('click','.response div p',function(){
//     $(this).parent().remove();
//    console.log($(this).parent())
// });
// });
// $(document).on('click','.response div p',function(){
//     $(this).parent().remove();
//    console.log($(this).parent())
// });
// $(document).on('click','.response div p',function(){
//     $(this).parent().remove();
//    console.log($(this).parent())
// });
});



// $(document).ready(function () { 
//     $(document).on("click", ".ExpBtn", function (e) {
//         e.preventDefault();       
//         $('.loader').show();
//         $('.QueRow').hide();
//         let feelings = $(this).data('feeling');
//             chrome.storage.sync.set({ feelings: '' });
//               chrome.storage.sync.set({ feelings: feelings });
        
//      });
// });


$(document).on("click", ".play", function (e) {
    $('.loader').show();
    $('.agree_div').hide();
    $('.opinion_option').hide();
    $('.writing_option').hide();
    $('.size_option').hide();
    $('.tone_option').hide();
    $('.response').hide();
    var opinion = $(this).parents('#quentintou').find('.response .response_opinion span').text();
    console.log("hello",opinion)
    var size = $(this).parents('#quentintou').find('.response .response_size span').text();
    var writing =$(this).parents('#quentintou').find('.response .response_writing span');
    var writing_array = [];
    if ($(writing).length > 0) {
        $(writing).each(function(i)
        {
            if ($.inArray($(this).text(), writing_array) != -1)
            {
                console.log("hello")
            
            }
            else{
                writing_array.push($(this).text())
            
            
            }
        });
    }
    var tone = $(this).parents('#quentintou').find('.response .response_tone span');
    var tone_Array = [];
    if ($(tone).length > 0) {
        $(tone).each(function(i)
        {
            if ($.inArray($(this).text(), tone_Array) != -1) {
                console.log("hello")
            }
            else {
                tone_Array.push($(this).text())
            }
        });
    }
    var linkedin_post_description = $(this).closest('.feed-shared-update-v2__comments-container').parent().parent().find('.feed-shared-update-v2__description-wrapper').text().trim();
    $(this).addClass('current-class-ld');



    let post_conatainer_selector = ".x78zum5.x1n2onr6.xh8yej3";

      $(post_conatainer_selector).removeClass("que-current-container");

      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".que-processed-class")
        .closest(post_conatainer_selector)
        .addClass("que-current-container que-red-border");

    selector_post_description = $(".que-current-container").find(
        'div[data-ad-comet-preview="message"][data-ad-preview="message"]'
      );
      

      if (selector_post_description.length > 0) {
        facebook_post_description = selector_post_description.text();
        //console.log(post_description);
      }
    chrome.storage.sync.get(["language","job","sector"], function (result) {        
        var temp = {}
        if (typeof result.language != "undefined" && result.language != "") {
            temp.language = result.language;
            temp.opinion = opinion;
            temp.size = size;
            temp.writing = writing_array;
            temp.tone = tone_Array;

        }
        if (typeof result.job != "undefined" && result.job != "") {
            temp.job = result.job;
            temp.opinion = opinion;
            temp.size = size;
            temp.writing = writing_array;
            temp.tone = tone_Array;

        }
        if (typeof result.sector != "undefined" && result.sector != "") {
            temp.sector = result.sector;
            temp.opinion = opinion;
            temp.size = size;
            temp.writing = writing_array;
            temp.tone = tone_Array;

        }
        else{
            temp.size = size;
            temp.opinion = opinion;
            temp.writing = writing_array;
            temp.tone = tone_Array;
        }
        console.log("new temp",temp)
        chrome.storage.sync.set({ "responsedata": temp });
      //  $("body").scrollTop(0);
      $(this).parents('#quentintou').closest('.que-processed-class').scrollTop(100);

        //$("#quentintou").animate({"scrollTop": $("#quentintou").scrollTop() + 100});
        if (window.location.href.indexOf('linkedin.com') > -1 ) {
            //$(this).parent().addClass('find-dom');
            LinkedInDOM.addChatGPTforLinkedin(linkedin_post_description, temp);            
        } else if (window.location.href.indexOf('facebook.com') > -1 ) { 
            FacebookDOM.addChatGPTforFacebook($(this), temp, facebook_post_description);
        }
    })
})

$(document).on("click", ".reload", function (e) {
    $('.loader').show();
    $('.agree_div').hide();
    $('.opinion_option').hide();
    $('.writing_option').hide();
    $('.size_option').hide();
    $('.tone_option').hide();
    $('.response').hide();
    chrome.storage.sync.get(["language","job","sector","responsedata"], function (result) {        
        var temp = {}
        //if (typeof result.language != "undefined" && result.language != "") {
            temp.language = result.language;
            temp.job = result.job;
            temp.sector = result.sector;
            temp.opinion = result.responsedataopinion;
            temp.size = result.responsedata.size;
            temp.writing = result.responsedata.writing_array;
            temp.tone = result.responsedata.tone_Array;

        // }
        // if (typeof result.job != "undefined" && result.job != "") {
        //     temp.job = result.job;
        //     temp.opinion = result.responsedataopinion;
        //     temp.size = result.responsedata.size;
        //     temp.writing = result.responsedata.writing_array;
        //     temp.tone = result.responsedata.tone_Array;

        // }
        // if (typeof result.sector != "undefined" && result.sector != "") {
        //     temp.sector = result.sector;
        //     temp.opinion = result.responsedataopinion;
        //     temp.size = result.responsedata.size;
        //     temp.writing = result.responsedata.writing_array;
        //     temp.tone = result.responsedata.tone_Array;

        // }
        // if (typeof result.responsedata != "undefined" && result.responsedata != "") {
        //     temp.opinion = result.responsedataopinion;
        //     temp.size = result.responsedata.size;
        //     temp.writing = result.responsedata.writing_array;
        //     temp.tone = result.responsedata.tone_Array;
        // }
        var linkedin_post_description = $(this).closest('.feed-shared-update-v2__comments-container').parent().parent().find('.feed-shared-update-v2__description-wrapper').text().trim();
    $(this).addClass('current-class-ld');

        //chrome.storage.sync.set({ "responsedata": temp });
        let post_conatainer_selector = ".x78zum5.x1n2onr6.xh8yej3";

        $(post_conatainer_selector).removeClass("que-current-container");
  
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .find(".que-processed-class")
          .closest(post_conatainer_selector)
          .addClass("que-current-container que-red-border");
  
      selector_post_description = $(".que-current-container").find(
          'div[data-ad-comet-preview="message"][data-ad-preview="message"]'
        );
        
  
        if (selector_post_description.length > 0) {
          facebook_post_description = selector_post_description.text();
          //console.log(post_description);
        }
        chrome.storage.sync.set({ "responsedata": temp });

          $(this).parents('#quentintou').closest('.que-processed-class').scrollTop(100);

          //$("#quentintou").animate({"scrollTop": $("#quentintou").scrollTop() + 100});
          if (window.location.href.indexOf('linkedin.com') > -1 ) {
              //$(this).parent().addClass('find-dom');
              LinkedInDOM.addChatGPTforLinkedin(linkedin_post_description, temp);            
          } else if (window.location.href.indexOf('facebook.com') > -1 ) { 
              FacebookDOM.addChatGPTforFacebook($(this), temp, facebook_post_description);
          }
    })

});




// CLICK ON MESSENGER TEXT AREA BOX. (FOR SEND MESSAGES)
async function clickOnElements(element) {
    console.log(element);
    let MouseEvent = document.createEvent("MouseEvents");
    MouseEvent.initEvent("mouseover", true, true);
    const over = document.querySelector(element).dispatchEvent(MouseEvent);
    //await sleep(50);
    MouseEvent.initEvent("mousedown", true, true);
    const down = document.querySelector(element).dispatchEvent(MouseEvent);
    MouseEvent.initEvent("mouseup", true, true);
    const up = document.querySelector(element).dispatchEvent(MouseEvent);
    MouseEvent.initEvent("click", true, true);
    const click = document.querySelector(element).dispatchEvent(MouseEvent);
    console.log(over, down, up, click);

    if (over) {
        return new Promise((resolve) => {
            resolve();
        });
    } else {
        return await clickOnElements(element);
    }
}
