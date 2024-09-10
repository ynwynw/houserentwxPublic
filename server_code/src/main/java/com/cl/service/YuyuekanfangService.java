package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.YuyuekanfangEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.YuyuekanfangView;


/**
 * 预约看房
 *
 * @author 
 * @email 
 * @date 2024-05-15 17:48:57
 */
public interface YuyuekanfangService extends IService<YuyuekanfangEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<YuyuekanfangView> selectListView(Wrapper<YuyuekanfangEntity> wrapper);
   	
   	YuyuekanfangView selectView(@Param("ew") Wrapper<YuyuekanfangEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<YuyuekanfangEntity> wrapper);
   	

}

