
$(document).ready(function(){
    var sections = $(".pg-item");
    var menu_links = $(".side-menu ul li a");

    $(window).scroll(function(){
        if (sections.filter(":in-viewport:last").attr("id") == sections.last().attr("id")) {
            menu_links.removeClass("active");
            menu_links.last().addClass("active");
        }
        else {
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.side-menu ul li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
            });
        }
    });
    $(window).trigger('scroll');
});




// Local scroll
//---------------------------------------------

$(document).ready(function(){
    $('.main-menu, .go-projects, .side-logo-wrap, .side-menu').localScroll({
        target: 'body',
        hash: true,
        //margin: true,
        duration: 1230,
        easing: "easeInOutExpo"
    });
});

// Mobile menu
//---------------------------------------------

$(document).ready(function(){

    $(".ps-icon-menu, .ps-menu-toggle").click(function(){
        if ($(".sidebar").hasClass("opened")) {

            $(".sidebar").animate({
                left: "-350px"
            }, "easeOutCirc");
            $(".ps-icon-menu").removeClass("actived");
            $(".ps-icon-menu b").animate({
                right: "50%",
                marginRight: "-17px"
            });
            $(".white-overlay").fadeOut();
            $(".sidebar").removeClass("opened");

        }
        else {

            $(".white-overlay").fadeIn();
            $(".sidebar").animate({
                left: 0
            }, 300, "easeOutCirc");
            $(".ps-icon-menu").addClass("actived");
            $(".ps-icon-menu b").animate({
                right: "10px",
                marginRight: 0
            });
            $(".sidebar").addClass("opened");

        }
    });

    $(window).scroll(function(){
        if ($(".sidebar").hasClass("opened")) {

            $(".sidebar").animate({
                left: "-350px"
            }, "easeOutCirc");
            $(".ps-icon-menu").removeClass("actived");
            $(".ps-icon-menu b").animate({
                right: "50%",
                marginRight: "-17px"
            });
            $(".white-overlay").fadeOut();
            $(".sidebar").removeClass("opened");

        }
    });

});

// Works navigation
//---------------------------------------------

$(document).ready(function(){
    //Top panel sticky
    $(".project-navigation").sticky({
        topSpacing: 1
    });

    // Hash change function
    function hash_change(url){
        var hash_url = "#/" + url.replace(" .project-wrapper", "");
        window.location.hash = hash_url;
    }
    // Open project
    window.project_before_scroll = 0;
    $(".project-item-link").click(function(){
        project_before_scroll = $(window).scrollTop();
        $(this).addClass("project-opened");

        $(".home-page, .inside-pages").fadeOut(500);
        setTimeout(function(){
            $(".project-full").fadeIn(500);

            if (project_before_scroll != 0) {
                $("html, body").animate({
                    scrollTop: 0
                }, "fast", "easeOutExpo");
            }

        }, 550);

        var project_url = $(this).attr("href") + ' ' + '.project-wrapper';

        $(".project-full-load").load(project_url, function(){
            $(".project-loader").delay(700).fadeOut(500);
            $(".project-navigation").animate({
                top: 0
            }, 900, "easeOutCirc");
        });
        hash_change(project_url);

        return false;
    });
    // All projects (close project)
    function close_project(){
        $(".project-full").fadeOut(300);
        $(".project-navigation").animate({
            top: "-60px"
        });
        setTimeout(function(){
            $(".project-full-load").empty();
            $("html, body").animate({
                scrollTop: project_before_scroll + "px"
            }, "slow", "easeOutExpo");
        }, 350);
        setTimeout(function(){
            $(".home-page, .inside-pages").fadeIn(500);
        }, 750);



        project_opened = $(".project-opened");
        project_opened.removeClass("project-opened");
    }

    $(".project-all").click(function(){
        close_project();
        //Hash change
        window.location.hash = "";
    });



    // Prev project
    function prev_project(){
        $(".project-loader").fadeIn(300);
        var project_prev_url = $(".project-opened").parent().prev(".project-item").find(".project-item-link").attr("href") +
        ' ' +
        '.project-wrapper';

        setTimeout(function(){
            $(".project-full-load").empty().load(project_prev_url, function(){
                $(".project-loader").delay(200).fadeOut(500);
            });
        }, 500);

        var project_opened = $(".project-opened").parent().prev(".project-item").find(".project-item-link");
        $(".project-item-link").removeClass("project-opened");
        project_opened.addClass("project-opened");

        // If left end of the links
        if ($(".project-opened").parent().is(":first")) {
            project_prev_url = $(".project-item").last().find(".project-item-link").attr("href") +
            ' ' +
            '.project-wrapper';

            setTimeout(function(){
                $(".project-full-load").empty().load(project_prev_url, function(){
                    $(".project-loader").delay(200).fadeOut(500);
                });
            }, 500);
            project_opened = $(".project-item").last().find(".project-item-link");
            $(".project-item-link").removeClass("project-opened");
            project_opened.addClass("project-opened");
        }
        // Hash cahnge
        hash_change(project_prev_url);
    }
    $(".project-prev").click(function(){
        prev_project();
    });

    // Next project
    function next_project(){
        $(".project-loader").fadeIn(300);
        var project_next_url = $(".project-opened").parent().next(".project-item").find(".project-item-link").attr("href") +
        ' ' +
        '.project-wrapper';

        setTimeout(function(){
            $(".project-full-load").empty().load(project_next_url, function(){
                $(".project-loader").delay(200).fadeOut(500);
            });
        }, 500);

        var project_opened = $(".project-opened").parent().next(".project-item").find(".project-item-link");
        $(".project-item-link").removeClass("project-opened");
        project_opened.addClass("project-opened");

        // If right end of the links
        if ($(".project-opened").parent().is(":last")) {
            project_next_url = $(".project-item").first().find(".project-item-link").attr("href") +
            ' ' +
            '.project-wrapper';

            setTimeout(function(){
                $(".project-full-load").empty().load(project_next_url, function(){
                    $(".project-loader").delay(200).fadeOut(500);
                });
            }, 500);
            project_opened = $(".project-item").first().find(".project-item-link");
            $(".project-item-link").removeClass("project-opened");
            project_opened.addClass("project-opened");

        }
        // Hash cahnge
        hash_change(project_next_url);
    }
    $(".project-next").click(function(){
        next_project();
    });

    // Hash change event
    $(window).hashchange(function(){
        if ((location.hash.search("/244210e4") == -1) && ($(".project-full").is(":visible"))) {
            close_project();
        }
        else {
            hash_new = location.hash;
            project_url = hash_new.replace("#/", "") + ' ' + '.project-wrapper';


            if ((hash_new.replace("#/", "") != $(".project-opened").attr("href")) && ($(".project-full").is(":visible"))) {
                $(".project-loader").fadeIn(300);

                setTimeout(function(){
                    $(".project-full-load").empty().load(project_url, function(){
                        $(".project-loader").delay(200).fadeOut(500);
                    });
                }, 0);

                if (project_before_scroll != 0) {
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow", "easeOutExpo");
                }

                var project_opened = $(".project-item-link[href = '" + project_url.replace(" .project-wrapper", "") + "']");
                $(".project-item-link").removeClass("project-opened");
                project_opened.addClass("project-opened");
            }

            if ((hash_new.replace("#/", "") != $(".project-opened").attr("href")) && ($(".project-full").is(":hidden")) && (location.hash.search("/244210e4") != -1)) {

                $(".home-page, .inside-pages").fadeOut(500);
                setTimeout(function(){
                    $(".project-full").fadeIn(500);
                }, 550);

                setTimeout(function(){
                    $(".project-full-load").empty().load(project_url, function(){
                        $(".project-loader").delay(200).fadeOut(500);
                        $(".project-navigation").animate({
                            top: 0
                        }, 900, "easeOutCirc");

                        if (project_before_scroll != 0) {
                            $("html, body").animate({
                                scrollTop: 0
                            }, "fast", "easeOutExpo");
                        }
                    });
                }, 600);

                var project_opened = $(".project-item-link[href = '" + project_url.replace(" .project-wrapper", "") + "']");
                $(".project-item-link").removeClass("project-opened");
                project_opened.addClass("project-opened");
            }

        }
    });
    $(window).trigger('hashchange');
});
