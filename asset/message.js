Game.Message = {
    attr: {
        freshMessages: [],
        staleMessages: [],
        archivedMessages: [],
        archiveMessageLimit: 200
    },
    _curMessage: '',
    render: function(display) {
        display.clear();
        var dispRowMax = display._options.height - 1;
        var dispRow = 0;
        var freshIdx = 0;
        var staleIdx = 0;
        var fLen = this.attr.freshMessages.length;
        var sLen = this.attr.staleMessages.length;

        for (freshIdx = 0; freshIdx < fLen && dispRow < dispRowMax; freshIdx++) {
            dispRow += display.drawText(1, dispRow, this.attr.freshMessages[freshIdx], '#fff', '#000');
        }
        for (staleIdx = 0; staleIdx < sLen && dispRow < dispRowMax; staleIdx++) {
            dispRow += display.drawText(1, dispRow, this.attr.staleMessages[staleIdx], '#aaa', '#000');
        }
    },
    send: function(msg) {
        this.attr.freshMessages.push(msg);
    },
    clear: function() {
        this.attr.freshMessages = [];
        this.attr.staleMessages = [];
    }
};
