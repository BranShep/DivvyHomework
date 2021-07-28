//
//  ChartViewManager.m
//  BusinessIntelligence
//
//  Created by Brandon Shepherd on 7/27/21.
//

#import <React/RCTViewManager.h>
#import "BusinessIntelligence-Swift.h"

@interface MyChartViewManager: RCTViewManager
@end

@implementation MyChartViewManager

RCT_EXPORT_MODULE()

- (UIView *) view {
  return [[MyChartView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(xValues, NSArray)
RCT_EXPORT_VIEW_PROPERTY(yValues, NSArray)

@end
