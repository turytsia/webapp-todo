# Generated by Django 4.2.1 on 2023-06-17 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='color',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
