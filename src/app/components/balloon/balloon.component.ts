import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  inject,
  input,
} from '@angular/core';
import { IBalloon } from '../../balloon.interface';
import { AnimationBuilder, animate, style } from '@angular/animations';

@Component({
  selector: 'app-balloon',
  standalone: true,
  imports: [],
  templateUrl: './balloon.component.html',
  styleUrl: './balloon.component.scss',
})
export class BalloonComponent implements OnInit {
  balloon = input.required<IBalloon>();
  animBuilder = inject(AnimationBuilder);
  elRef = inject(ElementRef);
  @Output() balloonPopped = new EventEmitter<string>();

  ngOnInit(): void {
    this.animateBalloon();
  }
  animateBalloon() {
    const buffer = 20;
    const maxWidth =
      window.innerWidth -
      this.elRef.nativeElement.firstChild.clientWidth -
      buffer;
    const leftPosition = Math.floor(Math.random() * maxWidth);
    const minSpeed = 5;
    const speedVariation = 5;
    const speed = minSpeed + Math.random() * speedVariation;
    const flyAnimation = this.animBuilder.build([
      style({
        translate: `${leftPosition}px 0`,
        position: 'fixed',
        left: 0,
        bottom: 0,
      }),
      animate(
        `${speed}s ease-out`,
        style({
          translate: `${leftPosition}px -100vh`,
        })
      ),
    ]);
    const player = flyAnimation.create(this.elRef.nativeElement.firstChild);
    player.play();
    player.onDone(() => {
      console.log('animation done');
    });
  }

  pop() {
    this.balloonPopped.emit(this.balloon().id);
  }
}
