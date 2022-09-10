export default class UserInfo {
    constructor(nameSelector, jobSelector, imageSelector, imageChangerSelector) {
       this._name = document.querySelector(nameSelector);
       this._job = document.querySelector(jobSelector);
       this._image = document.querySelector(imageSelector);
       this._imageChanger = document.querySelector(imageChangerSelector);
       this._image.addEventListener('mouseenter', () => {
        this._imageChanger.classList.toggle('profile__edit-icon_active');
       });
       this._image.addEventListener('mouseleave', () => {
        this._imageChanger.classList.toggle('profile__edit-icon_active');
       });
    }

    getUserInfo() {
        return {name: this._name.textContent, job: this._job.textContent};
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.about;
        this.setAvatar(data.avatar);
    }
    setAvatar(link) {
        this._image.src = link;
    }
}