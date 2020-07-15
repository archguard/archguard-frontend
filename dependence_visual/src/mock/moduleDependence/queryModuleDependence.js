const response = [
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "close",
    calleeClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    calleeMethod: "flush"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    calleeMethod: "flush"
  },
  {
    callerClass: "evolution.dependence.application.fix.DeleteAll",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "deleteAll"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "deleteOne"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "findDuplicateClass"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "findClassByName"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "updateOneColumn"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "findDuplicateMethod"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "updateOneColumn"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "findMethodByName"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "deleteOne"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "findDuplicateMethod",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "queryColumns"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "findClassWithModular",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "queryColumns"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "findMethodByName",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "queryOneColumn"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "findDuplicateClass",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "queryOneColumn"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "findClassByName",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "queryOneColumn"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "findClassWithModular"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixUUIDColumn",
    callerMethod: "main",
    calleeClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    calleeMethod: "alertToChar36"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "evolution.dependence.application.VisitClass",
    calleeMethod: "visitDir"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "evolution.dependence.application.VisitClass",
    calleeMethod: "cleanSqlFile"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "visitDir",
    calleeClass: "evolution.dependence.application.VisitClass",
    calleeMethod: "visitFile"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "evolution.dependence.application.VisitClass",
    calleeMethod: "storeDatabase"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "evolution.dependence.application.VisitClass",
    calleeMethod: "visitDir"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "evolution.dependence.application.VisitClass",
    calleeMethod: "getCount"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "evolution.dependence.application.VisitClass",
    calleeMethod: "fixJMethodNullModule"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "flush",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "close"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "update"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "update"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "close"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "close",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "close"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doUpdateMethod",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "update"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "updateClassModule",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "update"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "findMethodId",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "findId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "findClass",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "findId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassMethod",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassDependence",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassField",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClass",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethodCall",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassParent",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "flush",
    calleeClass: "evolution.dependence.domain.IBatch",
    calleeMethod: "execute"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getName"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getModule"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getMethods"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getModule"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getMethods"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getDependences"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getParents"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getFields"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "setName"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "addMethod"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "addDependence"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "setModule"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "addParent"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "addField"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JClass",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassField",
    calleeClass: "evolution.dependence.domain.models.JField",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassField",
    calleeClass: "evolution.dependence.domain.models.JField",
    calleeMethod: "getType"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getCalls"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getCalls"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "addCalls"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "lambda$addCall$0",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getClz"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "lambda$addCall$0",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "addCall",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "findMethodId",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getName"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getAccess"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getCalls"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getReturnType"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doUpdateMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getReturnType"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getModule"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doUpdateMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getModule"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "findMethodId",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getClz"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "getClz"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "setAccess"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "setReturnType"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "addCall"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.models.JMethod",
    calleeMethod: "setModule"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "save"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClassMethods"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethod",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "findMethodId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveMethod",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doSaveNewMethod"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveMethod",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doUpdateMethod"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassMethods",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doSaveClassMethod"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "generateId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassMethod",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "generateId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassDependence",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "generateId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassField",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "generateId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClass",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "generateId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethodCall",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "generateId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassParent",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "generateId"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "close",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "flush"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "flush"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClassFields"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassFields",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doSaveClassField"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassDependeces",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClass"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassParent",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClass"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClass",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClass"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClass"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClass",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "findClass"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "lambda$saveClass$2",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doSaveClass"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClassDependeces"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassMethods",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveMethod"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethodCall",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveMethod"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveClassParent"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassDependeces",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doSaveClassDependence"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethod",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doSaveMethod"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethod",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "saveMethodCall"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassParent",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "doSaveClassParent"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "lambda$saveClass$1",
    calleeClass: "evolution.dependence.domain.repository.ClassRepository",
    calleeMethod: "updateClassModule"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "evolution.dependence.domain.repository.DateUtil",
    calleeMethod: "getCurrentTime"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassField",
    calleeClass: "evolution.dependence.domain.repository.DateUtil",
    calleeMethod: "getCurrentTime"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClass",
    calleeClass: "evolution.dependence.domain.repository.DateUtil",
    calleeMethod: "getCurrentTime"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "evolution.dependence.domain.repository.IClassRepository",
    calleeMethod: "save"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "visitDir",
    calleeClass: "evolution.dependence.domain.repository.IClassRepository",
    calleeMethod: "close"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    calleeMethod: "visitClass"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    calleeMethod: "visitClass"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    calleeMethod: "refineMethodOwner"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "visitFileFailed",
    calleeClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    calleeMethod: "visitFileFailed"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "postVisitDirectory",
    calleeClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    calleeMethod: "postVisitDirectory"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "visitFile",
    calleeClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    calleeMethod: "visitFile"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "<clinit>",
    calleeClass: "evolution.dependence.infrastructure.DBConfig",
    calleeMethod: "getDB"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "evolution.dependence.infrastructure.DBIStore",
    calleeMethod: "save"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "fixJMethodNullModule",
    calleeClass: "evolution.dependence.infrastructure.DBIStore",
    calleeMethod: "fix"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "evolution.dependence.infrastructure.DBIStore",
    calleeMethod: "delete"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "save",
    calleeClass: "evolution.dependence.infrastructure.DBIStore",
    calleeMethod: "doSave"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "getKey",
    calleeClass: "evolution.dependence.infrastructure.FileBatch",
    calleeMethod: "methodStoreKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "evolution.dependence.infrastructure.FileBatch",
    calleeMethod: "generateUpdateString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "add",
    calleeClass: "evolution.dependence.infrastructure.FileBatch",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "findId",
    calleeClass: "evolution.dependence.infrastructure.FileBatch",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "evolution.dependence.infrastructure.FileBatch",
    calleeMethod: "generateWhere"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "evolution.dependence.infrastructure.FileBatch",
    calleeMethod: "generateBatchInsertSql"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "getKey",
    calleeClass: "evolution.dependence.infrastructure.FileBatch",
    calleeMethod: "classStoreKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "evolution.dependence.infrastructure.FileBatch$UpdateRecord",
    calleeMethod: "getValues"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "evolution.dependence.infrastructure.FileBatch$UpdateRecord",
    calleeMethod: "getKeys"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch",
    calleeMethod: "generateBatchInsertSql"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch",
    calleeMethod: "generateUpdateString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "getKey",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch",
    calleeMethod: "methodStoreKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "add",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "findId",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "getKey",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch",
    calleeMethod: "classStoreKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch",
    calleeMethod: "generateWhere"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch$UpdateRecord",
    calleeMethod: "getValues"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "evolution.dependence.infrastructure.JdbiBatch$UpdateRecord",
    calleeMethod: "getKeys"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "evolution.dependence.utils.FileUtil",
    calleeMethod: "delete"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "evolution.dependence.utils.FileUtil",
    calleeMethod: "read"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "lambda$close$1",
    calleeClass: "evolution.dependence.utils.FileUtil",
    calleeMethod: "write"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "evolution.dependence.utils.FileUtil",
    calleeMethod: "write"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "evolution.dependence.utils.FileUtil",
    calleeMethod: "write"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "evolution.dependence.utils.FileUtil",
    calleeMethod: "write"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "evolution.dependence.utils.FileUtil",
    calleeMethod: "write"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "io.netty.util.internal.StringUtil",
    calleeMethod: "isNullOrEmpty"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "java.io.File",
    calleeMethod: "list"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "java.io.File",
    calleeMethod: "isDirectory"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "java.io.File",
    calleeMethod: "exists"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "java.io.File",
    calleeMethod: "createNewFile"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.io.FileInputStream",
    calleeMethod: "close"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "java.io.IOException",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "visitFileFailed",
    calleeClass: "java.io.IOException",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "java.io.IOException",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.Integer",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "java.lang.Long",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "java.lang.Long",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.lang.Long",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.Long",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.lang.Long",
    calleeMethod: "valueOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.Long",
    calleeMethod: "valueOf"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "<init>",
    calleeClass: "java.lang.Object",
    calleeMethod: "getClass"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.lang.Object",
    calleeMethod: "toString"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "lambda$queryOneColumn$0",
    calleeClass: "java.lang.Object",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.lang.Object",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "equals",
    calleeClass: "java.lang.Object",
    calleeMethod: "getClass"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "<init>",
    calleeClass: "java.lang.Object",
    calleeMethod: "getClass"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "<init>",
    calleeClass: "java.lang.Object",
    calleeMethod: "getClass"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.Object",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.Object",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "<init>",
    calleeClass: "java.lang.Object",
    calleeMethod: "getClass"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteAll",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "findMethodByName",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteOne",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "updateOneColumn",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "findClassByName",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "alertToChar36",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixUUIDColumn",
    callerMethod: "main",
    calleeClass: "java.lang.String",
    calleeMethod: "startsWith"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "java.lang.String",
    calleeMethod: "endsWith"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addParent",
    calleeClass: "java.lang.String",
    calleeMethod: "startsWith"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.lang.String",
    calleeMethod: "equalsIgnoreCase"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "lambda$addCall$0",
    calleeClass: "java.lang.String",
    calleeMethod: "equalsIgnoreCase"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "setName",
    calleeClass: "java.lang.String",
    calleeMethod: "replace"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addParent",
    calleeClass: "java.lang.String",
    calleeMethod: "replace"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "getName",
    calleeClass: "java.lang.String",
    calleeMethod: "replace"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addDependence",
    calleeClass: "java.lang.String",
    calleeMethod: "replace"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "setClz",
    calleeClass: "java.lang.String",
    calleeMethod: "replace"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "<init>",
    calleeClass: "java.lang.String",
    calleeMethod: "replace"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "setReturnType",
    calleeClass: "java.lang.String",
    calleeMethod: "replace"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "addCall",
    calleeClass: "java.lang.String",
    calleeMethod: "equalsIgnoreCase"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "refineMethodOwner",
    calleeClass: "java.lang.String",
    calleeMethod: "equalsIgnoreCase"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.lang.String",
    calleeMethod: "substring"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.lang.String",
    calleeMethod: "lastIndexOf"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBConfig",
    callerMethod: "getDB",
    calleeClass: "java.lang.String",
    calleeMethod: "length"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "getKey",
    calleeClass: "java.lang.String",
    calleeMethod: "equalsIgnoreCase"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.String",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "getKey",
    calleeClass: "java.lang.String",
    calleeMethod: "equalsIgnoreCase"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "toString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "toString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "toString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "getAccess",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "toString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "getAccess",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "delete",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "delete",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "lambda$close$1",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "methodStoreKey",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "lambda$close$1",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "methodStoreKey",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "substring"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "substring"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "substring"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "substring"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "substring"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "substring"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "methodStoreKey",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "append"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "methodStoreKey",
    calleeClass: "java.lang.StringBuilder",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "java.lang.System",
    calleeMethod: "currentTimeMillis"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "java.lang.System",
    calleeMethod: "currentTimeMillis"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "java.lang.System",
    calleeMethod: "getProperty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBConfig",
    callerMethod: "getDB",
    calleeClass: "java.lang.System",
    calleeMethod: "getProperty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.lang.System",
    calleeMethod: "currentTimeMillis"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.System",
    calleeMethod: "currentTimeMillis"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.lang.System",
    calleeMethod: "currentTimeMillis"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "java.lang.System",
    calleeMethod: "currentTimeMillis"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "visitFile",
    calleeClass: "java.nio.file.attribute.BasicFileAttributes",
    calleeMethod: "isRegularFile"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "visitDir",
    calleeClass: "java.nio.file.Files",
    calleeMethod: "walkFileTree"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "java.nio.file.Files",
    calleeMethod: "write"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "read",
    calleeClass: "java.nio.file.Files",
    calleeMethod: "readAllLines"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "delete",
    calleeClass: "java.nio.file.Files",
    calleeMethod: "delete"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "java.nio.file.Path",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "java.nio.file.Path",
    calleeMethod: "toFile"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.nio.file.Path",
    calleeMethod: "toFile"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.nio.file.Path",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "java.nio.file.Path",
    calleeMethod: "toFile"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "java.nio.file.Path",
    calleeMethod: "getFileName"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "java.nio.file.Paths",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "java.nio.file.Paths",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "visitDir",
    calleeClass: "java.nio.file.Paths",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "java.nio.file.Paths",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "delete",
    calleeClass: "java.nio.file.Paths",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "read",
    calleeClass: "java.nio.file.Paths",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.domain.repository.DateUtil",
    callerMethod: "getCurrentTime",
    calleeClass: "java.text.SimpleDateFormat",
    calleeMethod: "format"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Collection",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Collection",
    calleeMethod: "iterator"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "compareAndSet"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "get"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "incrementAndGet"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "decrementAndGet"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "getCount",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "incrementAndGet"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "compareAndSet"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "save",
    calleeClass: "java.util.concurrent.atomic.AtomicInteger",
    calleeMethod: "incrementAndGet"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "visitFile",
    calleeClass: "java.util.concurrent.ExecutorService",
    calleeMethod: "submit"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "visitFile",
    calleeClass: "java.util.function.Consumer",
    calleeMethod: "accept"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "java.util.function.Consumer",
    calleeMethod: "accept"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethod",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassParent",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassFields",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassMethods",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassDependeces",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassFields",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassDependeces",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethod",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassParent",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassMethods",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "save",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "save",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Iterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.Iterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "java.util.List",
    calleeMethod: "stream"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addMethod",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addField",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.util.List",
    calleeMethod: "isEmpty"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.util.List",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.util.List",
    calleeMethod: "stream"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassFields",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassMethods",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "refineMethodOwner",
    calleeClass: "java.util.List",
    calleeMethod: "contains"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "refineMethodOwner",
    calleeClass: "java.util.List",
    calleeMethod: "stream"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "save",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "save",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "save",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "save",
    calleeClass: "java.util.List",
    calleeMethod: "clear"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "add",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "update",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.List",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.util.List",
    calleeMethod: "isEmpty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "java.util.List",
    calleeMethod: "isEmpty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.List",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.List",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "java.util.List",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "update",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "add",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "java.util.List",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.util.ListIterator",
    calleeMethod: "next"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "java.util.ListIterator",
    calleeMethod: "hasNext"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "save",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "lambda$queryOneColumn$0",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "findMethodId",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveNewMethod",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doUpdateMethod",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassMethod",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassDependence",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassField",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "findClass",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClass",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethodCall",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveClassParent",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "updateClassModule",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "add",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "update",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "lambda$add$0",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "add",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "classStoreKey",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "update",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "methodStoreKey",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "lambda$add$0",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map",
    calleeMethod: "clear"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "java.util.Map",
    calleeMethod: "clear"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Map",
    calleeMethod: "entrySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Map",
    calleeMethod: "entrySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map",
    calleeMethod: "entrySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Map",
    calleeMethod: "values"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Map",
    calleeMethod: "keySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "add",
    calleeClass: "java.util.Map",
    calleeMethod: "containsKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Map",
    calleeMethod: "size"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "update",
    calleeClass: "java.util.Map",
    calleeMethod: "containsKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "update",
    calleeClass: "java.util.Map",
    calleeMethod: "containsKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "add",
    calleeClass: "java.util.Map",
    calleeMethod: "containsKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "update",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "methodStoreKey",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "classStoreKey",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "add",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Map",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "update",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "add",
    calleeClass: "java.util.Map",
    calleeMethod: "put"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map",
    calleeMethod: "clear"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "java.util.Map",
    calleeMethod: "clear"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Map",
    calleeMethod: "entrySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Map",
    calleeMethod: "entrySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map",
    calleeMethod: "entrySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Map",
    calleeMethod: "values"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Map",
    calleeMethod: "keySet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getValue"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getValue"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getValue"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getValue"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getValue"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getValue"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.Map$Entry",
    calleeMethod: "getKey"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "equals",
    calleeClass: "java.util.Objects",
    calleeMethod: "equals"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "hashCode",
    calleeClass: "java.util.Objects",
    calleeMethod: "hash"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveMethod",
    calleeClass: "java.util.Optional",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClass",
    calleeClass: "java.util.Optional",
    calleeMethod: "ifPresent"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "doSaveMethod",
    calleeClass: "java.util.Optional",
    calleeMethod: "isPresent"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClass",
    calleeClass: "java.util.Optional",
    calleeMethod: "filter"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClass",
    calleeClass: "java.util.Optional",
    calleeMethod: "orElseGet"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "add",
    calleeClass: "java.util.Optional",
    calleeMethod: "ifPresent"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Optional",
    calleeMethod: "ifPresent"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "isPresent"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "of"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Optional",
    calleeMethod: "of"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "getKey",
    calleeClass: "java.util.Optional",
    calleeMethod: "of"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Optional",
    calleeMethod: "empty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "getKey",
    calleeClass: "java.util.Optional",
    calleeMethod: "empty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "empty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "getKey",
    calleeClass: "java.util.Optional",
    calleeMethod: "empty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "empty"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "add",
    calleeClass: "java.util.Optional",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "get"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "add",
    calleeClass: "java.util.Optional",
    calleeMethod: "isPresent"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "isPresent"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "findId",
    calleeClass: "java.util.Optional",
    calleeMethod: "of"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "getKey",
    calleeClass: "java.util.Optional",
    calleeMethod: "of"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addParent",
    calleeClass: "java.util.Set",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addDependence",
    calleeClass: "java.util.Set",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "addCall",
    calleeClass: "java.util.Set",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.domain.models.JMethod",
    callerMethod: "addCalls",
    calleeClass: "java.util.Set",
    calleeMethod: "addAll"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassDependeces",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveMethod",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "saveClassParent",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateWhere",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateBatchInsertSql",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "generateUpdateString",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "java.util.Set",
    calleeMethod: "iterator"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "java.util.stream.Collectors",
    calleeMethod: "toList"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.util.stream.Collectors",
    calleeMethod: "toList"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "refineMethodOwner",
    calleeClass: "java.util.stream.Collectors",
    calleeMethod: "toList"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "java.util.stream.Stream",
    calleeMethod: "collect"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "java.util.stream.Stream",
    calleeMethod: "map"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.util.stream.Stream",
    calleeMethod: "collect"
  },
  {
    callerClass: "evolution.dependence.domain.models.JClass",
    callerMethod: "addCall",
    calleeClass: "java.util.stream.Stream",
    calleeMethod: "filter"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "refineMethodOwner",
    calleeClass: "java.util.stream.Stream",
    calleeMethod: "collect"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "refineMethodOwner",
    calleeClass: "java.util.stream.Stream",
    calleeMethod: "map"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "generateId",
    calleeClass: "java.util.UUID",
    calleeMethod: "toString"
  },
  {
    callerClass: "evolution.dependence.domain.repository.ClassRepository",
    callerMethod: "generateId",
    calleeClass: "java.util.UUID",
    calleeMethod: "randomUUID"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "org.objectweb.asm.ClassReader",
    calleeMethod: "accept"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "org.objectweb.asm.tree.InsnList",
    calleeMethod: "iterator"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "org.objectweb.asm.Type",
    calleeMethod: "getType"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "org.objectweb.asm.Type",
    calleeMethod: "getInternalName"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "org.objectweb.asm.Type",
    calleeMethod: "getReturnType"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "fix",
    calleeClass: "org.skife.jdbi.v2.Batch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "org.skife.jdbi.v2.Batch",
    calleeMethod: "add"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "fix",
    calleeClass: "org.skife.jdbi.v2.Batch",
    calleeMethod: "execute"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "org.skife.jdbi.v2.Batch",
    calleeMethod: "execute"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteAll",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteOne",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryColumns",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "updateOneColumn",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "alertToChar36",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "delete",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "fix",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "open"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "delete",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "close"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "fix",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "close"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "org.skife.jdbi.v2.DBI",
    calleeMethod: "close"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteAll",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "execute"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteOne",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "execute"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "updateOneColumn",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "execute"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "alertToChar36",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "execute"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryColumns",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "createQuery"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "createQuery"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteAll",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "close"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "deleteOne",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "close"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryColumns",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "close"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "updateOneColumn",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "close"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "close"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "alertToChar36",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "close"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "delete",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "execute"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "fix",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "createBatch"
  },
  {
    callerClass: "evolution.dependence.infrastructure.DBIStore",
    callerMethod: "doSave",
    calleeClass: "org.skife.jdbi.v2.Handle",
    calleeMethod: "createBatch"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryColumns",
    calleeClass: "org.skife.jdbi.v2.Query",
    calleeMethod: "list"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository",
    callerMethod: "queryOneColumn",
    calleeClass: "org.skife.jdbi.v2.Query",
    calleeMethod: "list"
  },
  {
    callerClass: "evolution.dependence.application.fix.DeleteAll",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "error"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "close",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixUUIDColumn",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "error"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "lambda$visitFile$0",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "error"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "error"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "error"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "cleanSqlFile",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "storeDatabase",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "main",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "visitClass",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "visitFileFailed",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "error"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "close",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "execute",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "debug"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "debug"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "close",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "execute",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "error"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "write",
    calleeClass: "org.slf4j.Logger",
    calleeMethod: "info"
  },
  {
    callerClass: "evolution.dependence.application.fix.DeleteAll",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassDuplicate",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixClassModule",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass:
      "evolution.dependence.application.fix.FixClassModuleRepository",
    callerMethod: "<init>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodDuplicate",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixMethodModule",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.application.fix.FixUUIDColumn",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.application.OneClassVisitor",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.application.VisitClass",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ClassPaser",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "<init>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.domain.scan.asm.ProcessFiles",
    callerMethod: "<init>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.infrastructure.FileBatch",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.infrastructure.JdbiBatch",
    callerMethod: "<init>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  },
  {
    callerClass: "evolution.dependence.utils.FileUtil",
    callerMethod: "<clinit>",
    calleeClass: "org.slf4j.LoggerFactory",
    calleeMethod: "getLogger"
  }
];

export default response