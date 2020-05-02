import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss'],
})
export class SocialShareComponent implements OnInit {
  shareUrl: string;
  constructor(
    public dialogRef: MatDialogRef<SocialShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.shareUrl = `https://nmanikiran.github.io/movieMasti/movie/${
      this.data.movie.id
    }`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  share(type: string) {
    let href = '';
    const options =
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600';
    switch (type) {
      case 'facebook':
        href += `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrl}`;
        window.open(href, '', options);
        break;

      case 'twitter':
        href += `https://twitter.com/intent/tweet?text=${
          this.data.movie.original_title
        }&url=${this.shareUrl}`;
        window.open(href, '', options);
        break;
      case 'google+':
        href += `https://plus.google.com/share?url=${this.shareUrl}`;
        window.open(href, '', options);
        break;
      default:
        break;
    }
  }

  copyLink(movieId) {
    const inputElement = document.getElementById('inputId');
    (<any>inputElement).select();
    document.execCommand('copy');
    inputElement.blur();
    this.dialogRef.close();
  }

  ngOnInit() {}
}
