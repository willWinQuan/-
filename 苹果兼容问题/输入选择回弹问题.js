


//失去焦点重置
$("input,select,textarea").on("blur", function () {
    resetView(this)
});

function resetView(target) {
    setTimeout(function () {
        //设置为true回到顶部对齐，设置为false与底部对齐
        document.activeElement.scrollIntoViewIfNeeded(false);
        document.activeElement.scrollIntoView(false)
    }, 100);
}