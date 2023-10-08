import { UpdateService } from './../update.service';
import { Component, OnInit } from '@angular/core';
import { GetService } from '../get.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SocialMedia } from './SocialMedia';
import { AddService } from '../add.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  userId: string;
  user: any;
  imageuploaded: any;

  isEditMode = false;

  showCameraIcon = false;

  website = '';
  instagram = '';
  twitter = '';
  facebook = '';
  github = '';

  saveValue(field: string, newValue: any) {
    const SocialMedia: SocialMedia = {
      website: this.website,
      instagram: this.instagram,
      twitter: this.twitter,
      github: this.github,
      facebook: this.facebook,
    };
    console.log(this.user);
    this.add.addSocialMedia(this.user.id, SocialMedia);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode === false) {
      this.update.updateUser(
        this.user.id,
        this.user.name,
        this.user.job,
        this.user.phone
      );
    }
  }

  getSaveButtonText() {
    return this.isEditMode ? 'Save' : 'Edit';
  }

  onMouseEnter() {
    this.showCameraIcon = true;
  }

  onMouseLeave() {
    this.showCameraIcon = false;
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageUrl = reader.result;

        this.imageuploaded = imageUrl;
        this.afAuth.authState.subscribe((user) => {
          this.update.updateUserIMG(user.uid, this.imageuploaded);
        });
      };
    }
  }

  constructor(
    private get: GetService,
    private afAuth: AngularFireAuth,
    private update: UpdateService,
    private add: AddService
  ) {}

  likedBooks: string[] = [];
  showMessage = false;

  addLikedBook(book: string) {
    this.likedBooks.push(book);
  }
  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.get.getById(user.uid).subscribe((userObj) => {
          this.user = userObj;

          this.website = this.user.SocialMedia.website || '';
          this.instagram = this.user.SocialMedia.instagram || '';
          this.twitter = this.user.SocialMedia.twitter || '';
          this.facebook = this.user.SocialMedia.facebook || '';
          this.github = this.user.SocialMedia.github || '';
        });
      } else {
        console.log('No user logged in.');
      }
    });

    if (this.likedBooks.length === 0) {
      this.showMessage = true;
    }
  }
}
