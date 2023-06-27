export const roleValidate = (ERROR_ENUM) => {
    if(ERROR_ENUM == "VALIDATION_ERROR_USERROLE_REQUIRED"){
     return  "Kasb nomini kiritishingiz shart"
    }else if(ERROR_ENUM =="USERROLE_ALREADY_EXISTS"){
      return "Bunday nom bilan avval kasb qo'shilgan"
    }
    else if(ERROR_ENUM =="USERROLE_NOT_FOUND"){
      return "Bunday nom bilan kasb topilmadi"
    }
    else if(ERROR_ENUM =="USERROLE_REFERENCES_WITH_USER"){
      return "Bu kasbda xodim topildi"
    }
  
    else if(ERROR_ENUM =="VALIDATION_ERROR_USERROLE_LENGTH"){
      return "Kiritilayotgan kasb uzunligi 25 ta belgidan kam bo`lishi zarur"
    }

    else if(ERROR_ENUM =="VALIDATION_ERROR_USERROLE_STRING"){
      return "Kasb nomi bo`sh bo`lmasligi kerak"
    }
  
  };
  