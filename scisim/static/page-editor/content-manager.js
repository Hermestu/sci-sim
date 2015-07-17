function addPage() {
    var newPage = '<button onClick="promptRemove('+getPageNumToAdd()+')">Remove Page</button><div class="page-header"><h3 onClick="updateTitle(this)">Page Title</h3></div><div id="add-elem-'+getPageNumToAdd()+'"><span></span><button class="glyphicon glyphicon-font" onClick="addElement(\'text\','+getPageNumToAdd()+')">   Text</button><button class="glyphicon glyphicon-picture" onClick="addElement(\'image\','+getPageNumToAdd()+')">   Image</button><button class="glyphicon glyphicon-edit" onClick="addElement(\'input\','+getPageNumToAdd()+')">   Input</button><button class="glyphicon glyphicon-share" onClick="addElement(\'button\','+getPageNumToAdd()+')">   Button</button><span></span><div class=\'linked-page\'>Link Page:<button>Dropdown</buttonn</div></div><div class="page-attrs"> Page Attributes: </div>';
    var pages = document.getElementById('pages');
    var newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'page-num-'+ getPageNumToAdd());
    newdiv.setAttribute('class', 'page');
    newdiv.innerHTML = newPage;
    pages.appendChild(newdiv);
}

function addElement(type, num) {
    var sectionToAdd = "<div class= 'content'>";
    switch(type.trim()) {
            case "text":
                            sectionToAdd += "<textarea class='paratext'></textarea>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button> </div>";
                            break;
            case "input":
                            sectionToAdd += "<p>Text input field</p>";
                            sectionToAdd += "<div>Tag:<input type='text'></input><button onClick='removeSection(this)'>Remove Section</button> </div>";
                            break;
            case "button":
                            sectionToAdd += "<p>Button text: <textarea></textarea></p>";
                            sectionToAdd += "<p>Button link: <button>Dropdown</button></p>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button></div>";
                            break;
            case "image" :
                            sectionToAdd += "<p>Upload image: (still to add)</p>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button></div>";
                            break;
    }
    sectionToAdd += "</div>";
    
    $('#add-elem-'+num).before(sectionToAdd);
}

function promptRemove(num) {
    var newPrompt = '<div id="btn-for-remove-'+num+'">Are you sure you want to remove this page?<button onClick="removePage('+num+')">Yes</button><button onClick="removeConfirm('+num+')">No</button></div>';
    //document.getElementById('pages').insertBefore(newPrompt[0], $('page-num-'+num)[0]);
    $('#page-num-'+num).before(newPrompt);
}

function removePage(num) {
    //check if any pages link to this
    
    //remove page
    $('#page-num-'+num).remove();
    removeConfirm(num);
}

function removeConfirm(num) {
    $('#btn-for-remove-'+num).remove();
}

function removeSection(e) {
    e.parentNode.parentNode.remove();
}

function updateTitle(item) {
    var html = item.innerHTML;
    var content = '<div><input type="text" value="'+html+'"></input><button onClick="finishUpdate(this)">Update</button></div>';
    $(item).before(content);
    item.remove();
}

function finishUpdate(item) {
    var html = item.parentNode.children[0].value;
    var content = '<h3 onClick="updateTitle(this)">'+html+'</h3>';
    $(item.parentNode).before(content);
    item.parentNode.remove();
}

function getPageNumToAdd() {
    return Number($("#pages > div").last()[0].id.split("-")[2]) + 1;
}