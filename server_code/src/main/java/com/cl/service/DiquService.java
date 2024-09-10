package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.DiquEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiquView;


/**
 * 地区
 *
 * @author 
 * @email 
 * @date 2024-05-15 17:48:57
 */
public interface DiquService extends IService<DiquEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<DiquView> selectListView(Wrapper<DiquEntity> wrapper);
   	
   	DiquView selectView(@Param("ew") Wrapper<DiquEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<DiquEntity> wrapper);
   	

}

