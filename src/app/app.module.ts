import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { ScrollerModule } from 'primeng/scroller';

@NgModule({
    declarations: [AppComponent, PokemonComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ButtonModule,
        AutoCompleteModule,
        BrowserAnimationsModule,
        TableModule,
        TagModule,
        DialogModule,
        InputTextareaModule,
        InputTextModule,
        CarouselModule,
        ScrollerModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
