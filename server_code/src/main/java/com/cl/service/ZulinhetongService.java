package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.ZulinhetongEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ZulinhetongView;


/**
 * 租赁合同
 *
 * @author 
 * @email 
 * @date 2024-05-15 17:48:58
 */
public interface ZulinhetongService extends IService<ZulinhetongEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ZulinhetongView> selectListView(Wrapper<ZulinhetongEntity> wrapper);
   	
   	ZulinhetongView selectView(@Param("ew") Wrapper<ZulinhetongEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ZulinhetongEntity> wrapper);
   	

}

