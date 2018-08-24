
import "reflect-metadata";
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Component, NgModule, ComponentRef, Injector, ApplicationRef, ComponentFactoryResolver, Injectable, NgZone } from "@angular/core";

@Injectable()
export class CustomCompileService {

    private appRef: ApplicationRef;

    constructor(
        private injector: Injector,
        private resolver: ComponentFactoryResolver
    ) { }

    configure(appRef) {
        this.appRef = appRef;
    }

    compile(component, onAttach) {
        const compFactory = this.resolver.resolveComponentFactory(component);
        let compRef = compFactory.create(this.injector);

        if (onAttach)
            onAttach(compRef);

        this.appRef.attachView(compRef.hostView);
        compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

        let div = document.createElement('div');
        div.appendChild(compRef.location.nativeElement);
        return div;
    }

}


