package com.cl.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cl.utils.PageUtils;
import com.cl.utils.Query;


import com.cl.dao.YuyuekanfangDao;
import com.cl.entity.YuyuekanfangEntity;
import com.cl.service.YuyuekanfangService;
import com.cl.entity.view.YuyuekanfangView;

@Service("yuyuekanfangService")
public class YuyuekanfangServiceImpl extends ServiceImpl<YuyuekanfangDao, YuyuekanfangEntity> implements YuyuekanfangService {
	
	
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<YuyuekanfangEntity> page = this.selectPage(
                new Query<YuyuekanfangEntity>(params).getPage(),
                new EntityWrapper<YuyuekanfangEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<YuyuekanfangEntity> wrapper) {
		  Page<YuyuekanfangView> page =new Query<YuyuekanfangView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<YuyuekanfangView> selectListView(Wrapper<YuyuekanfangEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public YuyuekanfangView selectView(Wrapper<YuyuekanfangEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
