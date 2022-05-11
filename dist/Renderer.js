class Renderer {
    constructor() { }
    renderPlayers(playersdata) {
        this.source = $('#players-template').html();
        this.playerstemplate = Handlebars.compile(this.source);
        this.newHTML = this.playerstemplate({ playersdata });
        $('#players-container').append(this.newHTML)
    }
}
