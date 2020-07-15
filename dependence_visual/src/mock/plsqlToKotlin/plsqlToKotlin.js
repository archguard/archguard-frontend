const response = `package a
import java.util.*
import java.math.BigDecimal

import java.sql.Date
import java.sql.Types
import java.sql.SQLException
import java.sql.ResultSet

import org.jdbi.v3.core.Handle
import org.jdbi.v3.core.Jdbi
import org.jdbi.v3.core.mapper.RowMapper
import org.jdbi.v3.core.statement.StatementContext

/* a */
object F_CHECK_REPORT_FILTER {

   
    
    
   
        fun fCheckReportFilter( iBusinessId:T_AOQ.BUSINESS_ID%TYPE,iOt:Int,iDs:Int,jdbi: Jdbi):Boolean {
        val handle = jdbi.open()
        try {
                        var vCount:Int?  = 0
                        var Boolean:Boolean?  = null
                                            if(I_DS == 1) {  //6
                            if(I_OT IN (1, 2)) {  //8
                                   //AND T1.LIABILITY_STATE = 1
    

                            // 9~26
    vCount = getvCountFromtCm_tCp_1(iBusinessId,handle)
            }
                     else if (            I_OT IN (3, 4)) { //27
                                   //AND T1.LIABILITY_STATE = 1
    

                            // 28~47
    vCount = getvCountFromtCm_tCp_2(iBusinessId,handle)
             }
                    }
            else { //49 ~ 130
                            if(I_OT == 1) {  //50
                                   //AND T1.LIABILITY_STATE = 1
    

                            // 51~68
    vCount = getvCountFromtP_tPp_3(iBusinessId,handle)
            }
                     else if (            I_OT == 2) { //69
                                   //AND T1.LIABILITY_STATE = 1
    

                            // 70~87
    vCount = getvCountFromtGp_tGpProduct_4(iBusinessId,handle)
             }
         else if (            I_OT == 3) { //88
                                   //AND T1.LIABILITY_STATE = 1
    

                            // 89~108
    vCount = getvCountFromtP_tPp_5(iBusinessId,handle)
             }
         else if (            I_OT == 4) { //109
                                   //AND T1.LIABILITY_STATE = 1
    

                            // 110~129
    vCount = getvCountFromtGp_tGpProduct_6(iBusinessId,handle)
             }
                    }
                            if(V_COUNT > 0) {  //133
                        return             true            }
            else { //135 ~ 136
                        return             false            }
                } finally {
            handle.close()
        }
    } //// end fCheckReportFilter       
    
    
   
                private fun getvCountFromtCm_tCp_1( iBusinessId:T_AOQ.BUSINESS_ID%TYPE,handle:Handle):Int {
        val sql = """SELECT COUNT(1) 
           FROM T_CM        T1, 
                T_CP       T2, 
                T_ARF T3, 
                T_ACRO  T4 
          WHERE T1.P_ID = T2.P_ID 
            AND T1.O_ID IN 
                (SELECT O_ID 
                   FROM T_COR 
                  START WITH O_ID = T3.O_ID 
                 CONNECT BY PRIOR O_ID = PARENT_ID) 
            AND T2.PRO_ID = T3.PRO_ID 
            AND T3.O_ID = T4.O_ID 
            AND T4.REPORT_STATUS = 1 
            AND T1.VALIDATE_DATE > T4.ONLINE_DATE 
               --AND T1.LIABILITY_STATE = 1 
            AND T1.P_ID = :I_BUSINESS_ID""".trimIndent()

        return handle.createQuery(sql)
                    .bind("I_BUSINESS_ID",iBusinessId)
                            .mapTo(Int::class.java)
                    .one()
      }
       
    
    
   
                private fun getvCountFromtCm_tCp_2( iBusinessId:T_AOQ.BUSINESS_ID%TYPE,handle:Handle):Int {
        val sql = """SELECT COUNT(1) 
           FROM T_CM        T1, 
                T_CP       T2, 
                T_ARF T3, 
                T_PC          T4, 
                T_ACRO  T5 
          WHERE T1.P_ID = T2.P_ID 
            AND T1.O_ID IN 
                (SELECT O_ID 
                   FROM T_COR 
                  START WITH O_ID = T3.O_ID 
                 CONNECT BY PRIOR O_ID = PARENT_ID) 
            AND T2.PRO_ID = T3.PRO_ID 
            AND T1.P_ID = T4.P_ID 
            AND T3.O_ID = T5.O_ID 
            AND T5.REPORT_STATUS = 1 
            AND T1.VALIDATE_DATE > T5.ONLINE_DATE 
               --AND T1.LIABILITY_STATE = 1 
            AND T4.CHANGE_ID = :I_BUSINESS_ID""".trimIndent()

        return handle.createQuery(sql)
                    .bind("I_BUSINESS_ID",iBusinessId)
                            .mapTo(Int::class.java)
                    .one()
      }
       
    
    
   
                private fun getvCountFromtP_tPp_3( iBusinessId:T_AOQ.BUSINESS_ID%TYPE,handle:Handle):Int {
        val sql = """SELECT COUNT(1) 
           FROM T_P                 T1, 
                T_PP         T2, 
                T_ARF T3, 
                T_ACRO  T4 
          WHERE T1.P_ID = T2.P_ID 
            AND T1.O_ID IN 
                (SELECT O_ID 
                   FROM T_COR 
                  START WITH O_ID = T3.O_ID 
                 CONNECT BY PRIOR O_ID = PARENT_ID) 
            AND T2.PRO_ID = T3.PRO_ID 
            AND T3.O_ID = T4.O_ID 
            AND T4.REPORT_STATUS = 1 
            AND T1.INSERT_TIME > T4.ONLINE_DATE 
               --AND T1.LIABILITY_STATE = 1 
            AND T1.P_ID = :I_BUSINESS_ID""".trimIndent()

        return handle.createQuery(sql)
                    .bind("I_BUSINESS_ID",iBusinessId)
                            .mapTo(Int::class.java)
                    .one()
      }
       
    
    
   
                private fun getvCountFromtGp_tGpProduct_4( iBusinessId:T_AOQ.BUSINESS_ID%TYPE,handle:Handle):Int {
        val sql = """SELECT COUNT(1) 
           FROM T_GP           T1, 
                T_GP_PRODUCT   T2, 
                T_ARF T3, 
                T_ACRO  T4 
          WHERE T1.P_ID = T2.P_ID 
            AND T1.O_ID IN 
                (SELECT O_ID 
                   FROM T_COR 
                  START WITH O_ID = T3.O_ID 
                 CONNECT BY PRIOR O_ID = PARENT_ID) 
            AND T2.PRO_ID = T3.PRO_ID 
            AND T3.O_ID = T4.O_ID 
            AND T4.REPORT_STATUS = 1 
            AND T1.INSERT_TIME > T4.ONLINE_DATE 
               --AND T1.LIABILITY_STATE = 1 
            AND T1.P_ID = :I_BUSINESS_ID""".trimIndent()

        return handle.createQuery(sql)
                    .bind("I_BUSINESS_ID",iBusinessId)
                            .mapTo(Int::class.java)
                    .one()
      }
       
    
    
   
                private fun getvCountFromtP_tPp_5( iBusinessId:T_AOQ.BUSINESS_ID%TYPE,handle:Handle):Int {
        val sql = """SELECT COUNT(1) 
           FROM T_P                 T1, 
                T_PP         T2, 
                T_ARF T3, 
                T_P_CANCEL          T4, 
                T_ACRO  T5 
          WHERE T1.P_ID = T2.P_ID 
            AND T1.O_ID IN 
                (SELECT O_ID 
                   FROM T_COR 
                  START WITH O_ID = T3.O_ID 
                 CONNECT BY PRIOR O_ID = PARENT_ID) 
            AND T2.PRO_ID = T3.PRO_ID 
            AND T1.P_ID = T4.P_ID 
            AND T3.O_ID = T5.O_ID 
            AND T5.REPORT_STATUS = 1 
            AND T1.INSERT_TIME > T5.ONLINE_DATE 
               --AND T1.LIABILITY_STATE = 1 
            AND T4.CANCEL_ID = :I_BUSINESS_ID""".trimIndent()

        return handle.createQuery(sql)
                    .bind("I_BUSINESS_ID",iBusinessId)
                            .mapTo(Int::class.java)
                    .one()
      }
       
    
    
   
                private fun getvCountFromtGp_tGpProduct_6( iBusinessId:T_AOQ.BUSINESS_ID%TYPE,handle:Handle):Int {
        val sql = """SELECT COUNT(1) 
           FROM T_GP           T1, 
                T_GP_PRODUCT   T2, 
                T_ARF T3, 
                T_P_CANCEL          T4, 
                T_ACRO  T5 
          WHERE T1.P_ID = T2.P_ID 
            AND T1.O_ID IN 
                (SELECT O_ID 
                   FROM T_COR 
                  START WITH O_ID = T3.O_ID 
                 CONNECT BY PRIOR O_ID = PARENT_ID) 
            AND T2.PRO_ID = T3.PRO_ID 
            AND T1.P_ID = T4.P_ID 
            AND T3.O_ID = T5.O_ID 
            AND T5.REPORT_STATUS = 1 
            AND T1.INSERT_TIME > T5.ONLINE_DATE 
               --AND T1.LIABILITY_STATE = 1 
            AND T4.CANCEL_ID = :I_BUSINESS_ID""".trimIndent()

        return handle.createQuery(sql)
                    .bind("I_BUSINESS_ID",iBusinessId)
                            .mapTo(Int::class.java)
                    .one()
      }
    
} //// end F_CHECK_REPORT_FILTER

















`

export default response
