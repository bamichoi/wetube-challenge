# Wetube REROADED with Challenge

Global router
/ -> Home
/join -> Join
/login -> Login
/search -> Search

User router
/users/:id -> User profile
/users/edit -> Edit my profile
/users/delete -> Delete my profile
/users/logout -> logout

Videos router
/videos/:id -> Watch Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video



Wetube Challenge : No Spoiler(but only trailer)

- [x] User Authentication (Login / Create Account)   
- [x] Edit Profile
- [x] Change Password
- [x] Video Upload
- [x] Video Search
- [x] Video Edit
- [x] Watch Video
- [x] Javascript Video Player
- [x] Video List
- [x] View
- [x] Comment Section
- [x] delete comment
- [x] delete comment on fake comment
- [x] dlelte comment protect
- [x] username on comment
- [x] owner
- [ ] favicon


- 사용하지 않는 AVATAR 삭제 
- 비디오레코드 허용안됬을때 핸들링
- 컨트롤러 키입력
- home 정해진 개수만큼만 오브젝트 가지고 오기
- favicon ->> cross-origin 때문에 s3에서 로딩안되서 static 폴더 새로 만들어서 억지로 넣음..