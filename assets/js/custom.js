let GROUP_MESSAGES = [];
let SEGMENTS = [];
let loading = `
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary m-3" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
`;
let segmentNameArray = [];
$(document).ready(function () {
    $(".add-btn").click(function () {
        $(".segment_form .gray-tags.selected").html("")
        $("#add_edit_id_4_segment").val(0)
        $("#segment_name").val("")
        $("#segment_text").val("")
        $(".popup-01").addClass("is_active");
        $(".popup-01.is_active p.lg-hdg").text("Create Message Segments");
    
    });
    $(".add-btn-1").click(function () {
        $("#add_edit_id_4_group").val(0)
        $("#group_name").val("")
        $("#group_description").val("")
        $(".popup-02").addClass("is_active");
        $(".popup-02.is_active p.lg-hdg").text("Create Message Group")
        $("#group_section_count").val(0)

        $(".popup-02 .gray-tags").html('')
        $(".message-body-for-group ul").html('')
    });
    $(".back-login").click(function () {
        $(".popup-01").removeClass("is_active");
    });
    $(".msg-template span").click(function () {
        if ($(this).hasClass('active')) {
            let value = $("#segment_text").val()
            let appendText = $(this).text();
            value = value + " " + appendText;
            $("#segment_text").val(value)
            $(this).removeClass("active");
        } else {
            let value = $("#segment_text").val()
            let appendText = $(this).text();
            value = value.replace(" " + appendText, "");
            $("#segment_text").val(value)
            $(this).addClass("active");
        }
    });

    $(".msg-template-group span").click(function () {
        if ($(this).hasClass('active')) {
            let value = $("#group_description").val()
            let appendText = $(this).text();
            value = value + " " + appendText;
            $("#group_description").val(value)
            $(this).removeClass("active");
        } else {
            let value = $("#group_description").val()
            let appendText = $(this).text();
            value = value.replace(" " + appendText, "");
            $("#group_description").val(value)
            $(this).addClass("active");
        }
    });
    $("#add_new_segment_message").on("click", function () {
        let segment_text = $("#segment_text").val()
        $(".gray-tags.selected span.d-inline-block.mb-2 span i.fa.fa-times-circle").off('click');
        if (segment_text.trim() !== "") {
            let find = false;
            if ($("input[name='segment_text_hidden[]']").length > 0) {
                $("input[name='segment_text_hidden[]']").map((index, element) => {
                    if ($(element).val().toLowerCase() === segment_text.toLowerCase()) {
                        find = true
                    }
                })
            }
            if (!find) {
                $(".segment_form .gray-tags.selected").append(`
                    <span class="d-inline-block mb-2">
                        <span>${segment_text} <i class="fa fa-times-circle" aria-hidden="true"></i></span>
                        <input type="hidden" value="${segment_text}" name="segment_text_hidden[]" />
                    </span>
                `)
                $(".gray-tags.selected span.d-inline-block.mb-2 span i.fa.fa-times-circle").on("click", removeSegmentSpan);
            }
        }
        $("#segment_text").val("")
    })

    $("#group_segment_id").on("change", function () {
        console.log()
        let description = decodeURI($(this).find(':selected').data('keyword'))
        $("#group_description").val(description)
    })

    $(".open-sidebar").click(function () {
        $(".sidebar-wraper").addClass("side_active");
    });
    $(".sidebar-close").click(function () {
        $(".sidebar-wraper").removeClass("side_active");
    });
    $(".sidebar-close-1, .reminder_back_link").click(function () {
        $(".sidebar-wraper").addClass("side_active");
        $('.messenger-tags').show();
        $('.after-login').removeClass('d-none');
        $('.without-login header').show();
        $('#setting-segment-group').hide();
        $('.reminder-section').addClass('d-none');
        $('.side_active').show();
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if (tabs[0].url.indexOf('/groups/') > -1 && tabs[0].url.indexOf('/members') != -1) {
                $('.messenger-tags').hide();
                $('#add-friend').show();
                $('.after-login').removeClass('d-none width-800');
            } else {
                $('.messenger-tags').show();
                $('.after-login').removeClass('d-none');
                $('#add-friend').hide();
                // $('#tags-screen').parent().removeClass('width-450');
                // $('#tags-screen').parent().addClass('width-800');
            }
        });
    });

    $(".reminder-section button.add-btn").on('click', function () {
        $(".reminder-popup").removeClass("d-none");
        $(".reminder-section").addClass("d-none");
    })

    $(".reminder_back_link_1, .reminder-popup-form .btn_group button.cancel-btn").on('click', function () {
        $(".reminder-popup").addClass("d-none");
        $(".reminder-section").removeClass("d-none");
        $(".reminder-popup-form")[0].reset()
    })

    $(".tags-item").click(function () {
        $(this).toggleClass("active");
    });

    $(".tabs-listing>li").click(function () {
        var tabID = $(this).attr("data-tabs");
        $(this).addClass("active").siblings().removeClass("active");
        $("#tab-" + tabID).addClass("active").siblings().removeClass("active");
    })

    $(".flip_btn").click(function () {
        $(this).toggleClass("is_active");
        $(".flip-content").slideToggle("slow");
    });

    $(".template-popup").click(function () {
        $(".add-popup").fadeIn(500);
    });

    $(".closeing").click(function () {
        $(".popup").fadeOut(500);
    });

    $(".closed").click(function () {
        chrome.storage.sync.set({ permissions: "disable" });
        $(".popup").fadeOut(500);
    });

    $(".forget-pass").click(function () {
        $('.login-screen').hide();
        $('.forgot-screen').show();
        $('.password-screen').hide();
    });

    $(".back-login").click(function () {
        $('.login-screen').show();
        $('.forgot-screen').hide();
        $('.password-screen').hide();
    });

    $(".logout-ext").click(function () {
        let data = confirm('Are you sure you want to logout');
        if (data) {
            logout()
        }
    });

    chrome.storage.sync.get(["language","job","sector"], function (result) {
        if (typeof result.language != "undefined" && result.language != "") {
            $("#language").val(result.language);

      }
      if (typeof result.job != "undefined" && result.job != "") {
        $('#job').val(result.job);
  }
  if (typeof result.sector != "undefined" && result.sector != "") {
    $('#sector').val(result.sector);
}

    });

    $("#tags-submit").click(function () {
        $(this).closest("div").find("#loader").show();
       var lang = $('#language').val();
       var job = $('#job').val();
       var sector = $('#sector').val();
       chrome.storage.sync.get(["language","job","sector"], function (result) {
                   chrome.storage.sync.set({"language": lang });
        if(lang == ''){
                  if (typeof result.language != "undefined" && result.language != "") {
                        chrome.storage.sync.set({"language": result.language });
                  }
                  else
                  {
                         chrome.storage.sync.set({"language": lang });
                  }
                }
                else{
                    chrome.storage.sync.set({"language": lang });
                }
                if(job == ''){
                    if (typeof result.job != "undefined" && result.job != "") {
                          chrome.storage.sync.set({"job": result.job });
                    }
                    else
                    {
                           chrome.storage.sync.set({"job": job });
                    }
                  }
                  else{
                      chrome.storage.sync.set({"job": job });
                  }
                  if(sector == ''){
                    if (typeof result.sector != "undefined" && result.sector != "") {
                          chrome.storage.sync.set({"sector": result.sector });
                    }
                    else
                    {
                           chrome.storage.sync.set({"sector": sector });
                    }
                  }
                  else{
                      chrome.storage.sync.set({"sector": sector });
                  }
    });
    toastr.success("value submit");
    $(this).closest("div").find("#loader").hide();

    });
    

    $("#login_form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Email can not be empty",
                email: "Must be an email"
            },
            password: {
                required: "Password can not be empty"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function () {
            checkLogins();
            return false;
        }
    });


    $("#forgotpassword").validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: {
                required: "Email can not be empty",
                email: "Must be an email"
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function () {
            sendotp();
            return false;
        }
    });
    $(".reminder-popup-form").validate({
        rules: {
            reminder_title: {
                required: true
            },
            reminder_description: {
                required: true
            },
            reminder_time: {
                required: true
            },
            reminder_id: {
                required: true
            }
        },
        messages: {
            reminder_title: {
                required: "Reminder title is required"
            },
            reminder_description: {
                required: "Reminder description is required"
            },
            reminder_time: {
                required: "Reminder time is required"
            },
            reminder_id: {
                required: "Reminder id is required"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function () {
            saveUpdateReminder();
            return false;
        }
    })
    $("#setpassword").validate({
        rules: {
            otp: {
                required: true,
            },
            password: {
                required: true
            },
            confirmpassword: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            email: {
                required: "Otp can not be empty"
            },
            password: {
                required: "Password can not be empty"
            },
            confirmpassword: {
                required: "Confirm Password can not be empty",
                equalTo: "Confirm Password not match with password"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function () {
            resetpassword();
            return false;
        }
    });

  
  
});

function checkLogins() {
    $(".login_loader").css({ "display": "block" });
    var email = document.forms["login_form"]["email"].value;
    var password = document.forms["login_form"]["password"].value;
    var apiBaseUrl = custom_data.baseUrl + 'api/ext_login';
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    $.ajax({
        type: "POST",
        url: apiBaseUrl,
        data: { email: email, password: password },
        dataType: 'json'
    }).done(function (response) {
        console.log(response);
        if (response.status == 200) {
            toastr.success(response.msg);
            chrome.storage.sync.set({ jwt_token: response.apiToken, userdata: response.user });
            $(".login_loader").css({ "display": "none" });
            $('.login-screen').hide();
            $('.forgot-screen').hide();
            $('.password-screen').hide();
            $('.without-login').hide();
            $('.without-login').hide();
            $('.tags-screen').show();
//             $('.messenger-tags').show();
// $('.after-login').removeClass('d-none');
//             $('.without-login header').hide();
//             fetchtag();
        } else {
            $(".login_loader").css({ "display": "none" });
            toastr.error(response.msg);
        }
    }).fail(function (xhr, status, error) {
        $(".login_loader").css({ "display": "none" });
        toastr.error(error);
    });
}

function sendotp() {
    $(".otp_loader").css({ "display": "block" });
    var email = document.forms["sendotp"]["email"].value;
    var apiBaseUrl = custom_data.baseUrl + 'api/sendotp';
    console.log(apiBaseUrl);
    $.ajax({
        type: "POST",
        url: apiBaseUrl,
        data: { email: email },
        dataType: 'json'
    }).done(function (response) {
        console.log(response)
        if (response.status == 200) {
            toastr.success(response.msg);
            $(".otp_loader").css({ "display": "none" });
            chrome.storage.sync.set({ otpemail: email });
            $('.login-screen').hide();
            $('.forgot-screen').hide();
            $('.password-screen').show();
        } else {
            $(".otp_loader").css({ "display": "none" });
            toastr.error(response.msg);
        }
    }).fail(function (xhr, status, error) {
        $(".otp_loader").css({ "display": "none" });
        toastr.error(error);
    });
}

function resetpassword() {
    $(".password_loader").css({ "display": "block" });
    var otp = document.forms["setpassword"]["otp"].value;
    var password = document.forms["setpassword"]["password"].value;
    var apiBaseUrl = custom_data.baseUrl + 'api/setpassword';
    chrome.storage.sync.get('otpemail', function (result) {
        $.ajax({
            type: "POST",
            url: apiBaseUrl,
            data: { email: result.otpemail, otp: otp, password: password },
            dataType: 'json'
        }).done(function (response) {
            console.log(response)
            if (response.status == 200) {
                toastr.success(response.msg);
                $(".password_loader").css({ "display": "none" });
                chrome.storage.sync.remove('otpemail', function () {
                });
                $('.login-screen').show();
                $('.forgot-screen').hide();
                $('.password-screen').hide();
            } else {
                $(".password_loader").css({ "display": "none" });
                toastr.error(response.msg);
            }
        }).fail(function (xhr, status, error) {
            $(".password_loader").css({ "display": "none" });
            toastr.error(error);
        });
    });
}

// TRIGGER LOGOUT
function logout() {
    toastr.success('Logout Successfully');
    chrome.storage.sync.set({ jwt_token: '' });
    chrome.runtime.reload();
    $(".login_loader").css({ "display": "none" });
//     $('.login-screen').show();
//     $('.forgot-screen').hide();
//     $('.password-screen').hide();
//     $('#tags-screen').hide();
//     $('.messenger-tags').hide();
//     $('.without-login header').show();
 }

chrome.storage.sync.get(["permissions", "jwt_token", "otpemail"], function (result) {
    console.log(result);
            if(typeof result.otpemail != "undefined" && result.otpemail != ""){
                console.log("here1");
                   $('.login-screen').hide();
                    $('.forgot-screen').hide();
                    $('.password-screen').show();
                    $('.tags-screen').hide();            }
                else if (typeof result.jwt_token != "undefined" && result.jwt_token != "") {
                                    console.log("here2");

                    $('.login-screen').hide();
                    $('.forgot-screen').hide();
                    $('.password-screen').hide();
                    $('.tags-screen').show();
                }
            
           
        
});



// $("#numberOfReq").blur(function(){
//     var name=$('#numberOfReq').val();
//     if(name.length == 0 && $('#numberOfReq')[0].nextSibling == undefined){
//         $('#numberOfReq').after('<div class="red">*Please input a valid</div>');
//     }
//     else{
//         $('#numberOfReq')[0].nextSibling.remove();
//     }
// });

// $('#country-value').select2({
// 	tags: true,
//     tokenSeparators: [','], 
//     placeholder: "Add your tags here",
//     /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
//     selectOnClose: true, 
//     closeOnSelect: false
// });

// let input =document.getElementById("country-value");
// console.log("input",input)

// input.addEventListener("keyup",(e)=>{
//     for(i of countryvalue ){
//         console.log("i",i)
//     }
// })

