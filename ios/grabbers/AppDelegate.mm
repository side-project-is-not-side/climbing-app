#import "AppDelegate.h"

#import "RNSplashScreen.h"
#import <React/RCTBundleURLProvider.h>
#import <RNKakaoLogins.h>
#import <UIKit/UIKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"grabbers";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  self.window.rootViewController.view.backgroundColor = [UIColor colorWithRed:25.0/255.0 green:27.0/255.0 blue:29.0/255.0 alpha:1.0];
  self.window.backgroundColor = [UIColor colorWithRed:25.0/255.0 green:27.0/255.0 blue:29.0/255.0 alpha:1.0];

  BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
  if (ret == YES)
  { 
    [RNSplashScreen show];
  }
  return ret;
}

- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
 }

 return NO;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
