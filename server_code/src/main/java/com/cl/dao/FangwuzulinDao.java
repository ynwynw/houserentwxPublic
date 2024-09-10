package com.cl.dao;

import com.cl.entity.FangwuzulinEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.FangwuzulinView;


/**
 * 房屋租赁
 * 
 * @author 
 * @email 
 * @date 2024-05-15 17:48:57
 */
public interface FangwuzulinDao extends BaseMapper<FangwuzulinEntity> {
	
	List<FangwuzulinView> selectListView(@Param("ew") Wrapper<FangwuzulinEntity> wrapper);

	List<FangwuzulinView> selectListView(Pagination page,@Param("ew") Wrapper<FangwuzulinEntity> wrapper);
	
	FangwuzulinView selectView(@Param("ew") Wrapper<FangwuzulinEntity> wrapper);
	

}
