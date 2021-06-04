package com.titan.edufinity.assessmentservice.hystrix;

import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;

import java.util.function.Supplier;


public class CommonHystrixCommand<T> extends HystrixCommand<T> {

    Supplier<T> execute;
    Supplier<T> fallback;

    public CommonHystrixCommand(Setter config, Supplier<T> execute, Supplier<T> fallback) {
        super(config);
        this.execute = execute;
        this.fallback = fallback;
    }


    @Override
    protected T run() throws Exception {
        return execute.get();
    }

    @Override
    protected T getFallback() {
        if (fallback != null) {
            return fallback.get();
        }
        return super.getFallback();
    }
}
