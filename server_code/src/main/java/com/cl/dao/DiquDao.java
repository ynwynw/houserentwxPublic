package com.cl.dao;

import com.cl.entity.DiquEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiquView;


/**
 * 地区
 * 
 * @author 
 * @email 
 * @date 2024-05-15 17:48:57
 */
public interface DiquDao extends BaseMapper<DiquEntity> {
	
	List<DiquView> selectListView(@Param("ew") Wrapper<DiquEntity> wrapper);

	List<DiquView> selectListView(Pagination page,@Param("ew") Wrapper<DiquEntity> wrapper);
	
	DiquView selectView(@Param("ew") Wrapper<DiquEntity> wrapper);
	

}
