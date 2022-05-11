const render=new Renderer()
const getData = function (){
    let nameTeam = $("input").val()
    $.get(`teams/${nameTeam}`, function (data) {
        render.renderPlayers(data)
    })
}