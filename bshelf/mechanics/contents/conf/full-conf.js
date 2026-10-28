// //\\// site-wide config
(function(){
const {ns, nspaste, userOptions,fapp, fconf}=
    window.b$l.atree();
full_conf();
fapp.doesConfigLemma();
return;


function full_conf(){
    nspaste( fconf, {
         appDecor: {
            backButtonCaption       : 'Back to Lessons',
            landingImage            : 'empty.png',
            homePageCaption         :
                'Introduction to<br>Classical Mechanics',
            homePageSubCaption      : 'Interactive Lessons.<br>',
            homePageSubtitle        : '',
            //todm: this disables functionality ... not only CSS:
            helpBox_opacity0        : false,
            idleHelpButtonTooltip   : 'Get Help',
            putTextDescriptionIntoTopNavigationArrows : false,
        },
    });
}
})();