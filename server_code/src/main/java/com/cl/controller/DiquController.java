package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.cl.utils.ValidatorUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;

import com.cl.entity.DiquEntity;
import com.cl.entity.view.DiquView;

import com.cl.service.DiquService;
import com.cl.service.TokenService;
import com.cl.utils.PageUtils;
import com.cl.utils.R;
import com.cl.utils.MPUtil;
import com.cl.utils.CommonUtil;
import java.io.IOException;

/**
 * 地区
 * 后端接口
 * @author 
 * @email 
 * @date 2024-05-15 17:48:57
 */
@RestController
@RequestMapping("/diqu")
public class DiquController {
    @Autowired
    private DiquService diquService;



    


    /**
     * 后端列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,DiquEntity diqu,
		HttpServletRequest request){
        EntityWrapper<DiquEntity> ew = new EntityWrapper<DiquEntity>();

		PageUtils page = diquService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, diqu), params), params));

        return R.ok().put("data", page);
    }
    
    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,DiquEntity diqu, 
		HttpServletRequest request){
        EntityWrapper<DiquEntity> ew = new EntityWrapper<DiquEntity>();

		PageUtils page = diquService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, diqu), params), params));
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( DiquEntity diqu){
       	EntityWrapper<DiquEntity> ew = new EntityWrapper<DiquEntity>();
      	ew.allEq(MPUtil.allEQMapPre( diqu, "diqu")); 
        return R.ok().put("data", diquService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(DiquEntity diqu){
        EntityWrapper< DiquEntity> ew = new EntityWrapper< DiquEntity>();
 		ew.allEq(MPUtil.allEQMapPre( diqu, "diqu")); 
		DiquView diquView =  diquService.selectView(ew);
		return R.ok("查询地区成功").put("data", diquView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        DiquEntity diqu = diquService.selectById(id);
		diqu = diquService.selectView(new EntityWrapper<DiquEntity>().eq("id", id));
        return R.ok().put("data", diqu);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        DiquEntity diqu = diquService.selectById(id);
		diqu = diquService.selectView(new EntityWrapper<DiquEntity>().eq("id", id));
        return R.ok().put("data", diqu);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody DiquEntity diqu, HttpServletRequest request){
        if(diquService.selectCount(new EntityWrapper<DiquEntity>().eq("diqu", diqu.getDiqu()))>0) {
            return R.error("地区已存在");
        }
    	diqu.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(diqu);
        diquService.insert(diqu);
        return R.ok();
    }
    
    /**
     * 前端保存
     */
    @RequestMapping("/add")
    public R add(@RequestBody DiquEntity diqu, HttpServletRequest request){
        if(diquService.selectCount(new EntityWrapper<DiquEntity>().eq("diqu", diqu.getDiqu()))>0) {
            return R.error("地区已存在");
        }
    	diqu.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(diqu);
        diquService.insert(diqu);
        return R.ok();
    }



    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    public R update(@RequestBody DiquEntity diqu, HttpServletRequest request){
        //ValidatorUtils.validateEntity(diqu);
        diquService.updateById(diqu);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        diquService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }
    
	








}
