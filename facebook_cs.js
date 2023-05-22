/*
 *
 * FacebookDOM Javascript
 *
 * @since 5.0.0
 *
 */
let FacebookDOM;
(function ($) {
  let $this;
  let description;
    let feelingsvalue;
  var custom_data = {
    baseUrl: "https://extenionbackend.techrit.tech/",
    sendBulkMessageEnable: true, // true/false = true for enable , false for disable
    addFriend: true,
    addFriendFromComments: true,
  };
  FacebookDOM = {
    settings: {},
    initilaize: function () {
      $this = FacebookDOM;
      $(document).ready(function () {
        $this.onInitMethods();
      });
    },
    onInitMethods: function () {
      if (window.location.href.indexOf("facebook.com") > -1) {
        $(document).on("click", ".like", function () {
          $this.like("like");
        });
        $(document).on("click", ".dislike", function () {
          $this.like("dislike");
        });
        $(document).on("change", ".shorter_onchange", function () {
          $(".loader").show();
          $this.creatershorter($(this));
        });
        $(document).on("change", ".change_language", function () {
          $('.loader').show();
           $this.changelanguage($(this));
      })
      $(document).on("change", ".changewriting", function () {
          $('.loader').show();
           $this.changewriting($(this));
      })
      }
    },
    appendresponse: function() {  
      chrome.storage.sync.get(["responsedata"], function (result) { 
       var opinioncheck = $('.response_opinion').remove();
      
          if (typeof result.responsedata.opinion != "undefined" && result.responsedata.opinion != "") {
              
              $('<div class="response_opinion"><span>'+result.responsedata.opinion+'</span><p>x</p></div>').insertBefore( ".inner1" )
          }
         
                              if (typeof result.responsedata.tone != "undefined" && result.responsedata.tone.length != 0) {
              $(result.responsedata.tone).each(function(i)
              {
                  $('<div class="response_tone"><span>'+result.responsedata.tone[i]+'</span><p>x</p></div>').insertBefore( ".inner2" )  
              });
          }
          $('.response_writing').remove();
          if (typeof result.responsedata.writing != "undefined" && result.responsedata.writing.length != "") {
              $(result.responsedata.writing).each(function(i)
              {
                  $('<div class="response_writing"><span>'+result.responsedata.writing[i]+'</span><p>x</p></div>').insertBefore( ".inner3" )  
              });            
          }
          $('.response_size').remove();
          if (typeof result.responsedata.size != "undefined" && result.responsedata.size != "") {
              $('<div class="response_size"><span>'+result.responsedata.size+'</span><p>x</p></div>').insertBefore( ".inner4" )
      
      
          }
          
      }); 
  },
    addReactionPannelFB: function () {
      $comment_box = $(
        `div[contenteditable="true"][spellcheck="true"][data-lexical-editor="true"]:not(".que-processed-class")`
      );
      if ($comment_box.length > 0) {
        if (
          window.location.href.indexOf("facebook.com") > -1 &&
          window.location.href.indexOf("/messages/t/") > -1
        ) {
          $comment_box
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("ai2-message-page");
            $("#quentintou").remove();
        } else {
          $comment_box
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("ai2-feed-page");
        }
        
        $comment_box
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .append(appendHTML);
          //$('.ai2-message-page').find("#quentintou").remove();
        $comment_box.addClass("que-processed-class");
        $this.appendresponse();

      }
    },
    addChatGPTforFacebook: function (elem, feelings, post_description) {
      console.log(post_description);
      description =post_description;
      feelingsvalue = feelings;
      chrome.storage.sync.set({ post_description: "" });
      chrome.storage.sync.set({ post_description: post_description });
      selector_comment_btn =
        '.que-current-container div[aria-label="Leave a comment"]';

      $(selector_comment_btn).click();
       
      raw = JSON.stringify({
        "text": post_description,
        "temp": feelings,
        "type": "facebook",
      });
          chrome.runtime.sendMessage(
            { from: "content", action: "getResponseFromChatGPT", request: raw },
            function (response) {
              $this.putMessageinTextArea(response.result, elem);
            }
          );
    },
    putMessageinTextArea: function (apiResp, elem) {
      if (
        window.location.href.indexOf("facebook.com") > -1 &&
        window.location.href.indexOf("/messages/t/") > -1
      ) {
        selector = '.ai2-message-page div[aria-label][contenteditable="true"]';
      } else {
        selector = '.ai2-feed-page div[aria-label][contenteditable="true"]';
      }
      $('.loader').hide();
                    $('.agree_div').show();
                    $('.response').show();
                    $('.like').show();
                    $('.dislike').show();
                    $('.reload').show();
                    $('.play').hide();
      result = JSON.parse(apiResp).data.replace("\n\n", " ");
      result = result.replace(/\"/g, "");
      if ($(selector + ` p br`).length) {
        navigator.clipboard.writeText(result).then(async () => {
          await waitForElm(selector);

          let data = $(selector).children("p");
          await $.each(data, function (key, val) {
            let className = document.getElementsByClassName(
              $(this).attr("class")
            );
            $.each(className, function (key, val) {
              if ($(this).find("span[data-lexical-text='true']").length > 0) {
                var spans = $(this).find("span[data-lexical-text='true']");
                $.each(spans, function (key, val) {
                  if (key > 0) {
                    $(this).css("display", "none");
                  }
                });
                var brs = $(this).find("br");
                $.each(brs, function (key, val) {
                  if (key > 0) {
                    $(this).css("display", "none");
                  }
                });
              }
            });
          });

          document.execCommand("paste");
        });

        var evt = new Event("input", {
          bubbles: true,
        });

        if ($(selector + ` p br`).length) {
          var input = document.querySelector(selector + ` p br`);
          $(input).html("");
          input.innerHTML = result;
          input.dispatchEvent(evt);
          //$(selector+ ` p br`).after('<span data-text="true" class="ai2-custom-text">' + result + '</span>');
        }
      }
    },
    like: function (elem) {
      $('.loader').show();
      $('.agree_div').hide();
      $('.opinion_option').hide();
      $('.writing_option').hide();
      $('.size_option').hide();
      $('.tone_option').hide();
      $('.response').hide();
      $('.like').show();
      $('.dislike').show();
      $('.reload').show();
      $('.play').hide();
      var apiBaseUrl = custom_data.baseUrl + "api/likedislike";
      chrome.storage.sync.get(["jwt_token"], function (result) {
        if (typeof result.jwt_token != "undefined" && result.jwt_token != "") {
          var response = $(selector).text();
          var status = elem;
          if(status == "dislike")
           {
            $this.addChatGPTforFacebook(description, feelingsvalue);
           }
          var authtoken = result.jwt_token;
          $.ajax({
            type: "POST",
            url: apiBaseUrl,
            data: { response: response, status: status },
            headers: { Authorization: "Bearer " + authtoken },
            dataType: "json",
          })
            .done(function (response) {
              if (response.status == 200 && response.data == "like") {
                $('.loader').hide();
                    $('.agree_div').show();
                    $('.response').show();
                toastr.success(response.msg);
              } else if (response.status == 200 && response.data == "dislike") {
                $('.loader').hide();
                $('.agree_div').show();
                $('.response').show();
                toastr.error(response.msg);
              } else {
                $('.loader').hide();
                $('.agree_div').show();
                $('.response').show();
                toastr.error(response.msg);
              }
              $(".back-btn-01").trigger("click");
            })
            .fail(function (xhr, status, error) {
              $('.loader').hide();
              $('.agree_div').show();
              $('.response').show();
              toastr.error(error);
            });
        }
      });
    },
    creatershorter: function (elem) {
      var token = $(elem).val();
      chrome.storage.sync.set({ lengthshortner: "" });
      chrome.storage.sync.set({ lengthshortner: token });
      console.log("hello", token);

      chrome.storage.sync.get(
        ["feelings", "post_description"],
        function (result) {
          if (
            typeof result.feelings != "undefined" &&
            result.feelings != "" &&
            typeof result.post_description != "undefined" &&
            result.post_description != ""
          ) {
            raw = JSON.stringify({
              text: result.post_description,
              emotion: result.feelings,
              token: token,
            });
            chrome.runtime.sendMessage(
              {
                from: "content",
                action: "getResponseFromChatGPT",
                request: raw,
              },
              function () {
                //console.log('hi', response);
              }
            );
          }
          // $('.loader').hide();
        }
      );
    },
    changelanguage: function (elem) {
      var token = $(elem).val();
      chrome.storage.sync.set({ lengthshortner: "" });
      chrome.storage.sync.set({ lengthshortner: token });
      console.log("hello", token);

      chrome.storage.sync.get(
        ["feelings", "post_description"],
        function (result) {
          if (
            typeof result.feelings != "undefined" &&
            result.feelings != "" &&
            typeof result.post_description != "undefined" &&
            result.post_description != ""
          ) {
            raw = JSON.stringify({
              text: result.post_description,
              "language":$(elem).val()
            });
            chrome.runtime.sendMessage(
              {
                from: "content",
                action: "getResponseFromChatGPT",
                request: raw,
              },
              function () {
                //console.log('hi', response);
              }
            );
          }
          // $('.loader').hide();
        }
      );
    },
    changewriting: function (elem) {
      var token = $(elem).val();
      chrome.storage.sync.set({ lengthshortner: "" });
      chrome.storage.sync.set({ lengthshortner: token });
      console.log("hello", token);

      chrome.storage.sync.get(
        ["feelings", "post_description"],
        function (result) {
          if (
            typeof result.feelings != "undefined" &&
            result.feelings != "" &&
            typeof result.post_description != "undefined" &&
            result.post_description != ""
          ) {
            raw = JSON.stringify({
              text: result.post_description,
              "changewriting":$(elem).val()
            });
            chrome.runtime.sendMessage(
              {
                from: "content",
                action: "getResponseFromChatGPT",
                request: raw,
              },
              function () {
                //console.log('hi', response);
              }
            );
          }
          // $('.loader').hide();
        }
      );
    },
  };
  FacebookDOM.initilaize();
})(jQuery);
async function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
