/*
 * 
 * LinkedInDOM Javascript
 * 
 * @since 5.0.0
 * 
 */
let LinkedInDOM; 
(function ($) {
    let $this; 
    let description;
    let feelingsvalue;
    var custom_data = {
	"baseUrl" : 'https://extenionbackend.techrit.tech/',
	"sendBulkMessageEnable" : true, // true/false = true for enable , false for disable
	"addFriend" : true,
	"addFriendFromComments": true
};
    LinkedInDOM = {
        settings: {},
        initilaize: function() {
            $this = LinkedInDOM; 
            $(document).ready(function () {
                $this.onInitMethods(); 
            });            
        }, 
        onInitMethods: function() {
            if (window.location.href.indexOf('linkedin.com') > -1 ) {
                    $(document).on("click", ".like", function () {
                         $this.like("like");
                    })
                     $(document).on("click", ".dislike", function () {
                         $this.like("dislike");
                    })
                    $(document).on("change", ".shorter_onchange", function () {
                        $('.loader').show();
                         $this.creatershorter($(this));
                    })
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
        addReactionPannelLD: function() {           

            $comment_box = $($selectors_for_linkedin+`:not(".que-processed-class")`);           

            if ($comment_box.length > 0) {
                $comment_box.append(appendHTML);
                $this.appendresponse();
                if (window.location.href.indexOf('linkedin.com') > -1 && window.location.href.indexOf('messaging/thread/') > -1) {
                    $comment_box.addClass('ai2-link-message-page');
                } else {
                    $comment_box.addClass('ai2-link-home-page');
                }
                $comment_box.addClass("que-processed-class");
            }
        },        
        addChatGPTforLinkedin: function (post_description, feelings){
            console.log(post_description, feelings);
            description =post_description;
            feelingsvalue = feelings;
            // elem.parent().addClass('find-dom');
            // post_description = elem.closest('.feed-shared-update-v2__comments-container').parent().parent().find('.feed-shared-update-v2__description-wrapper').text();
            // console.log(elem, feelings)
            // elem.find('.feed-shared-update-v2__description-wrapper').addClass('find-dom');
            formfield = $('.current-class-ld').closest('.que-processed-class').find('form .ql-editor').addClass('que-active-post');
                    raw = JSON.stringify({
                        "text": post_description,
                        "temp": feelings,
                        "type": "linkedin",
                      });
                      chrome.runtime.sendMessage({ from: "content", action: "getResponseFromChatGPT", request: raw}, function(response) {
                          console.log('hi', response);
                          $('.current-class-ld').removeClass('current-class-ld');
                      });            
        },
        putMessageinTextArea: function(apiResp) {
            result = JSON.parse(apiResp).data.replace("\n\n", " ");            
            // formfield.removeClass('que-active-post');
            console.log("here")    

            if (window.location.href.indexOf('linkedin.com') > -1 && window.location.href.indexOf('messaging/thread/') > -1) {  
                console.log("here 1")    
                formfield = $('form[id*="msg-form-ember"]');
                if (formfield.find('.msg-form__contenteditable p').length > 0 ) {
                    navigator.clipboard.writeText(result).then(() => {
                        console.log(" Text Copied!!!!");
                    }); 

                    var evt = new Event('input', {
                        bubbles: true
                    });

                    var input = document.querySelector('form[id*="msg-form-ember"] .msg-form__contenteditable p');
                    $(input).html('');
                    input.innerHTML = result;
                    input.dispatchEvent(evt);
                    $('.loader').hide();
                    $('.agree_div').show();
                    $('.response').show();
                    $('.like').show();
                    $('.dislike').show();
                    $('.reload').show();
                    $('.play').hide();
                }
            } else {
                console.log("here 2")  
                formfield = $('.que-active-post');
                formfield.text('');
                formfield.text(result.replace(/\"/g,''));
                $('.loader').hide();
                $('.agree_div').show();
                $('.response').show();
                $('.like').show();
                $('.dislike').show();
                $('.reload').show();
                $('.play').hide();
            }
            

        },
        like: function(elem) {
            // alert(description)
            $('.like_option').hide();
             $('.loader').show();
                var apiBaseUrl = custom_data.baseUrl + 'api/likedislike';
            chrome.storage.sync.get(["jwt_token","responsedata"], function (result) {
                 if (typeof result.jwt_token != "undefined" && result.jwt_token != "") {
           var response = $(formfield).text();
           var status = elem;
           if(status == "dislike")
           {
            $this.addChatGPTforLinkedin(description, feelingsvalue);
           }
           var authtoken = result.jwt_token;
            $.ajax({
                type: "POST",
                url: apiBaseUrl,
                data: {response:response,status:status,temp:result.responsedata},
                headers: { "Authorization": "Bearer " + authtoken },
                dataType: 'json'
            }).done(function (response) {
                console.log(response);
                if (response.status == 200 && response.data == "like") {
                     $('.like_option').show();
                      $('.loader').hide();
                      $('.like').show();
                      $('.dislike').show();
                      $('.reload').show();
                      $('.play').hide();
                   toastr.success(response.msg);
                } 
                else if(response.status == 200 && response.data == "dislike"){
                    // $('.like_option').show();
                    //  $('.loader').hide();
                    //  $('.like').show();
                    //  $('.dislike').show();
                    //  $('.reload').show();
                    //  $('.play').hide();
                    toastr.error(response.msg);
                }
                else {
                    $('.like_option').show();
                     $('.loader').hide();
                     $('.like').show();
                     $('.dislike').show();
                     $('.reload').show();
                     $('.play').hide();
                    toastr.error(response.msg);
                }
                $(".back-btn-01").trigger('click')
            }).fail(function (xhr, status, error) {
                toastr.error(error);
                 $('.like_option').show();
                             $('.loader').hide();
                             $('.like').show();
                             $('.dislike').show();
                             $('.reload').show();
                             $('.play').hide();

            });
                 }

            })


        },
       
        creatershorter:function(elem){
            formfield.text('');
            var token = $(elem).val();
             chrome.storage.sync.set({ "lengthshortner": token });
            chrome.storage.sync.get(["feelings","post_description"], function (result) {
             if (typeof result.feelings != "undefined" && result.feelings != "" && typeof result.post_description != "undefined" && result.post_description != "") {
             raw = JSON.stringify({
              "text": result.post_description,
              "emotion": result.feelings,
              "token": token
            });
            chrome.runtime.sendMessage({ from: "content", action: "getResponseFromChatGPT", request: raw}, function() {
                //console.log('hi', response);
            });
        }
       

        
      //  $('.loader').hide();

            });

        },
        changelanguage:function(elem){
            formfield.text('');
            var token = $(elem).val();
             chrome.storage.sync.set({ "lengthshortner": token });
            chrome.storage.sync.get(["feelings","post_description"], function (result) {
             if (typeof result.feelings != "undefined" && result.feelings != "" && typeof result.post_description != "undefined" && result.post_description != "") {
             raw = JSON.stringify({
              "text": result.post_description,
              "language":$(elem).val()
            });
            chrome.runtime.sendMessage({ from: "content", action: "getResponseFromChatGPT", request: raw}, function() {
                //console.log('hi', response);
            });
        }
              });
            },
            changewriting:function(elem){
                formfield.text('');
                var token = $(elem).val();
                 chrome.storage.sync.set({ "lengthshortner": token });
                chrome.storage.sync.get(["feelings","post_description"], function (result) {
                 if (typeof result.feelings != "undefined" && result.feelings != "" && typeof result.post_description != "undefined" && result.post_description != "") {
                 raw = JSON.stringify({
                  "text": result.post_description,
                  "changewriting":$(elem).val()
                });
                chrome.runtime.sendMessage({ from: "content", action: "getResponseFromChatGPT", request: raw}, function() {
                    //console.log('hi', response);
                });
            }
                  });
                }

    };
    LinkedInDOM.initilaize();
})(jQuery);