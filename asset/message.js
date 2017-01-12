Game.Message = {
    attr: {
        freshMessages: [],
        staleMessages: [],
        archivedMessages: [],
        archivedMessageLimit: 200
    },
    render: function(display) {
        display.clear();
        var dispRowMax = display._options.height;
        var dispRow = 0;
        var freshIdx = 0;
        var staleIdx = 0;
        var fLen = this.attr.freshMessages.length;
        var sLen = this.attr.staleMessages.length;

        for (freshIdx = 0; freshIdx < fLen && dispRow < dispRowMax; freshIdx++) {
            dispRow += display.drawText(1, dispRow, this.attr.freshMessages[freshIdx], '#fff', '#000');
        }
        for (staleIdx = 0; staleIdx < sLen && dispRow < dispRowMax; staleIdx++) {
            dispRow += display.drawText(1, dispRow, this.attr.staleMessages[staleIdx], '#aa0', '#000');
        }
    },
    ageMessages: function() {
        // archive oldest stale message
        if (this.attr.staleMessages[0] != null) {
            this.attr.archivedMessages.unshift(this.attr.staleMessages.pop());
        }

        // dump messages over limit
        var aLen = this.attr.archivedMessages.length;
        while (aLen > this.attr.archivedMessageLimit) {
            this.attr.archivedMessages.pop();
            aLen--;
        }

        // move fresh messages to stale
        while (this.attr.freshMessages[0] != null) {
            this.attr.staleMessages.unshift(this.attr.freshMessages.shift());
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
