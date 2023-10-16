
{
    let style = document.createElement( 'style' );
    style.innerHTML = `

    img.isopen,
    img.isclosed {
        width : 20px;
        height  : 20px;
        cursor : pointer;  
    }
    .isopen div.trigger-content {
        display:block;
    }
    .isclosed div.trigger-content {
        display:none;
    }
    .isopen img.isopen,
    .isclosed img.isclosed {
        display:inline;
    }
    .isclosed img.isopen,
    .isopen img.isclosed {
        display:none;
    }
    .trigger-content {
        background-color:#efefef;
        margin-left:20px;
        padding:5px;
    }
    div.trigger-option {
        display : inline-block;
        white-space : normal;
    }        

    `;
    document.head.appendChild( style );
}
