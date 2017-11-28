import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'reaction',
    templateUrl: './reaction.component.html',
    styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

    showEmojis = false;
    emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];
    reactionCount: any;
    userReaction: any;

    constructor() { }

    ngOnInit() { }

    react(e, val) {
        e.stopPropagation();
        
        if (this.userReaction === val) {
            console.log(val);
        } else {
            console.log(val);
        }
    }
    toggleShow() {
        this.showEmojis = !this.showEmojis
    }
    emojiPath(emoji) {
        return `assets/reactions/${emoji}.svg`
    }
    hasReactions(index) {
        // return this.reactionCount, index.toString();
    }

}