export const userValidate = (ERROR_ENUM) => {
  if(ERROR_ENUM == "UPLOAD_ERROR_REQUIRED"){
    return  "Rasm yuklashingiz shart"
  }
  else if(ERROR_ENUM =="USER_ALREADY_EXISTS"){
    return "Bu email bilan foydalanuchi avval ro`yhatdan o`tgan"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_FIRSTNAME_REQUIRED") {
    return  "Xodim ismini kiritishingiz shart"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_LASTNAME_REQUIRED") {
    return  "Xodim familiyasini kiritishingiz shart"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_REQUIRED") {
    return  "Xodim kasbini kiritishingiz shart"
  } 
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_BRANCHID_REQUIRED") {
    return  "Asosiy filial kiritishingiz shart"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_ALLOWEBBRANCHES_REQUIRED") {
    return  "Ruhsat etilgan filial kiritishingiz shart"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_ROLEID_UUID") {
    return  "Xodim kasbini kiritishingiz shart"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_PASSWORD_REQUIRED") {
    return  "Parol kiritilishi shart"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR") {
    return  "Validatsiyada xatolik"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_FIRSTNAME_LENGTH") {
    return  "Xodimning ismi 30 ta belgidan kam bo`lishi kerak"
  }
  else if (ERROR_ENUM == "UPLOAD_ERROR_TYPE") {
    return  "Yuklanayotgan fayl jpeg, jpg, png formatda bo'lishi kerak"
  }
  else if (ERROR_ENUM == "CONTROLLER_NOT_FOUND") {
    return  "Bu filialda controller topilmadi"
  }
  else if (ERROR_ENUM == "USER_NOT_FOUND") {
    return  "Bunday xodim topilmadi"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USEREMAIL_REQUIRED") {
    return  "Email kiritish majburiy"
  }
  else if (ERROR_ENUM == "AUTHORIZATION_ERROR") {
    return  "Siz tizimda ro`yhatdan o`tmagansiz"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_FIRSTNAME_STRING") {
    return  "Xodim ismi bo`sh bo`lmasligi kerak"
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USER_LASTNAME_STRING") {
    return  "Xodim familiyasi bo`sh bo`lmasligi kerak"
  }
  else if (ERROR_ENUM == "USER_PASSWORD_NOTCORRECT") {
    return  "Parol xato kiritildi."
  }
  else if (ERROR_ENUM == "CONTROLLER_OFFLINE") {
    return  "Controller offline holda, iltimos Controllerni tekshiring."
  }
  else if (ERROR_ENUM == "VALIDATION_ERROR_USERROLE_ID_UUID") {
    return  "Tizimda xatolik, qaytadan urunib ko`ring"
  }
  
};
