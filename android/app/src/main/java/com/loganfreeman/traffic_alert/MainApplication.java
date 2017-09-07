package com.loganfreeman.traffic_alert;

import android.support.annotation.NonNull;

import com.loganfreeman.traffic_alert.BuildConfig;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.soloader.SoLoader;
import cl.json.RNSharePackage;

import java.util.Arrays;
import java.util.List;

import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;

public class MainApplication extends NavigationApplication {

  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  //   @Override
  //   public boolean getUseDeveloperSupport() {
  //     return BuildConfig.DEBUG;
  //   }
  //
  //   @Override
  //   protected List<ReactPackage> getPackages() {
  //     return Arrays.<ReactPackage>asList(
  //         new MainReactPackage(),
  //     );
  //   }
  // };
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @NonNull
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
		new VectorIconsPackage(),
		new LinearGradientPackage(),
		new ReactNativeConfigPackage(),
    new RNSharePackage(),
    new RNGooglePlacesPackage()
    );
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
